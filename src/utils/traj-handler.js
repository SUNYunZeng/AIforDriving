import store from '@/store';

let echarts = require('echarts');

export function process (data, cut_size) {
  // json转换
  let user = typeof data === 'string' ? JSON.parse(data)[0] : data[0];
  let trajectory = [];
  let norm_dict = eval(user.norm_dict);
  let [lngs, lats] = [eval(user.lngs), eval(user.lats)];
  let [min_lng, max_lat, max_lng, min_lat] = [Math.min(...lngs), Math.max(...lats), Math.max(...lngs), Math.min(...lats)];
  let center = wgs84togcj02tobd09(...dec_loc(norm_dict, (max_lng + min_lng) / 2, (max_lat + min_lat) / 2));
  // 定位范围，左上角与右上角
  let boundingbox = [wgs84togcj02tobd09(...dec_loc(norm_dict, min_lng, max_lat)),
    wgs84togcj02tobd09(...dec_loc(norm_dict, max_lng, min_lat))];
  for (let i = 0; i < lngs.length; i++) {
    trajectory.push(wgs84togcj02tobd09(...dec_loc(norm_dict, lngs[i], lats[i])));
  }
  const type_key = ['lngs', 'lats', 'travel_dis', 'spd', 'azimuth', 'key_point', 'sem_pt'];
  let recordMap = new Map();
  for (let i = 1; i <= cut_size; i++) {
    // 深拷贝
    let tmp = JSON.parse(JSON.stringify(user));
    for (let key of type_key) {
      let len = Math.max(2, parseInt(i / cut_size * trajectory.length - 1));
      tmp[key] = eval(user[key]).slice(0, len);
    }
    recordMap.set(i, tmp);
  }
  return {
    recordMap: recordMap,
    trajectory: trajectory,
    boundingbox: boundingbox,
    center: center,
    real_dest: trajectory[trajectory.length - 1]
  };
}

export function lines_factory (data) {
  let max_step = 0;
  const norm_dict = eval(data[0]['norm_dict']);
  for (let item of data) {
    max_step = Math.max(max_step, item['line_id']);
  }
  const hStep = 50 / max_step;
  let res = [];
  let [min_lng, max_lat, max_lng, min_lat] = [0, 0, 0, 0];
  let center;
  for (let item of data) {
    let points = [];
    let [lngs, lats] = [eval(item['lngs']), eval(item['lats'])];
    for (let i = 0; i < lngs.length; i++) {
      [min_lng, max_lat, max_lng, min_lat] = [Math.min(min_lng, lngs[i]), Math.max(max_lat, lats[i]),
        Math.max(max_lng, lngs[i]), Math.min(min_lat, lats[i])];
      points.push(wgs84togcj02tobd09(...dec_loc(norm_dict, lngs[i], lats[i])));
    }
    res.push({
      coords: points,
      lineStyle: {
        normal: {
          color: echarts.color.modifyHSL('#5A94DF', Math.round(hStep * item['line_id']))
        }
      }
    });
  }
  center = wgs84togcj02tobd09(...dec_loc(norm_dict, (max_lng + min_lng) / 2, (max_lat + min_lat) / 2));
  return {data: res, center: center};
}

export function points_factory (data, set) {
  let points = [];
  let max_eff = 0;
  let center;
  let max_lng, min_lng, max_lat, min_lat;
  if (set.length === 2) {
    let res1 = data_push(data, 'origin', points);
    let res2 = data_push(data, 'destination', points);
    max_eff = Math.max(res1[0], res2[0]);
    [max_lng, min_lng, max_lat, min_lat] = [Math.max(res1[1], res2[1]), Math.min(res1[2], res2[2]),
      Math.max(res1[3], res2[3]), Math.min(res1[4], res2[4])];

  } else {
    let res = data_push(data, set[0], points);
    max_eff = res[0];
    [max_lng, min_lng, max_lat, min_lat] = [res[1], res[2], res[3], res[4]];
  }
  center = [(max_lat + min_lat) / 2, (max_lng + min_lng) / 2];
  return {
    data: {
      max: max_eff,
      data: points
    },
    center: center
  };
}

let data_push = (data, key, res) => {
  let eff = key === 'origin' ? 'o_eff' : 'd_eff';
  const norm_dict = eval(data[0]['norm_dict']);
  let [max_eff, max_lng, min_lng, max_lat, min_lat] = [-10, 0, 1000, 0, 1000];
  for (let item of data) {
    let _pt = key === 'origin' ? eval(item[key]) : dec_loc(norm_dict, eval(item[key])[0], eval(item[key])[1]);
    let pt = wgs84togcj02tobd09(..._pt);
    max_eff = Math.max(max_eff, item[eff]);
    [max_lng, min_lng, max_lat, min_lat] = [Math.max(max_lng, pt[0]), Math.min(min_lng, pt[0]),
      Math.max(max_lat, pt[1]), Math.min(min_lat, pt[1])];
    res.push({
      lat: pt[1], lng: pt[0], eff: item[eff]
    });
  }
  return [max_eff, max_lng, min_lng, max_lat, min_lat];
};

let dec_loc = (norm_dict, lng, lat) =>
  [lng * norm_dict[1] + norm_dict[0], lat * norm_dict[3] + norm_dict[2]];

/**
 * WGS84转GCj02
 * 火星坐标系 (GCJ-02) 与百度坐标系 (BD-09) 的转换
 * @param lng
 * @param lat
 * @returns {*[]}
 */
export function wgs84togcj02tobd09 (lng, lat) {
  const xPI = 3.14159265358979324 * 3000.0 / 180.0;
  const PI = 3.1415926535897932384626;
  const a = 6378245.0;
  const ee = 0.00669342162296594323;
  // WGS84转GCj02
  let dlat = transformlat(lng - 105.0, lat - 35.0);
  let dlng = transformlng(lng - 105.0, lat - 35.0);
  let radlat = lat / 180.0 * PI;
  let magic = Math.sin(radlat);
  magic = 1 - ee * magic * magic;
  let sqrtmagic = Math.sqrt(magic);
  dlat = (dlat * 180.0) / ((a * (1 - ee)) / (magic * sqrtmagic) * PI);
  dlng = (dlng * 180.0) / (a / sqrtmagic * Math.cos(radlat) * PI);
  let mglat = lat + dlat;
  let mglng = lng + dlng;
  // 火星坐标系 (GCJ-02) 与百度坐标系 (BD-09) 的转换
  let z = Math.sqrt(mglng * mglng + mglat * mglat) + 0.00002 * Math.sin(mglat * xPI);
  let theta = Math.atan2(mglat, mglng) + 0.000003 * Math.cos(mglng * xPI);
  let bdlng = z * Math.cos(theta) + 0.0065;
  let bdlat = z * Math.sin(theta) + 0.006;
  // return [bdlng, bdlat]
  return [bdlng, bdlat];
}

function transformlat (lng, lat) {
  const PI = 3.1415926535897932384626;
  let ret = -100.0 + 2.0 * lng + 3.0 * lat + 0.2 * lat * lat + 0.1 * lng * lat + 0.2 * Math.sqrt(Math.abs(lng));
  ret += (20.0 * Math.sin(6.0 * lng * PI) + 20.0 * Math.sin(2.0 * lng * PI)) * 2.0 / 3.0;
  ret += (20.0 * Math.sin(lat * PI) + 40.0 * Math.sin(lat / 3.0 * PI)) * 2.0 / 3.0;
  ret += (160.0 * Math.sin(lat / 12.0 * PI) + 320 * Math.sin(lat * PI / 30.0)) * 2.0 / 3.0;
  return ret;
}

function transformlng (lng, lat) {
  const PI = 3.1415926535897932384626;
  let ret = 300.0 + lng + 2.0 * lat + 0.1 * lng * lng + 0.1 * lng * lat + 0.1 * Math.sqrt(Math.abs(lng));
  ret += (20.0 * Math.sin(6.0 * lng * PI) + 20.0 * Math.sin(2.0 * lng * PI)) * 2.0 / 3.0;
  ret += (20.0 * Math.sin(lng * PI) + 40.0 * Math.sin(lng / 3.0 * PI)) * 2.0 / 3.0;
  ret += (150.0 * Math.sin(lng / 12.0 * PI) + 300.0 * Math.sin(lng / 30.0 * PI)) * 2.0 / 3.0;
  return ret;
}

