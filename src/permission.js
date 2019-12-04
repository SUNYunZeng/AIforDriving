import router from '@/router'
import store from '@/store'
import {menusToRouters} from '@/utils';
import {LoadingBar} from 'iview'

let hasMenus = false;
router.beforeEach(async (to, from, next)=>{
  LoadingBar.start();
  if(hasMenus){
    next()
  }else{
    try{
      const routers = menusToRouters(store.state.menuItems);
      router.addRoutes(routers);
      hasMenus = true;
      next({path: to.path || '/'})
    }catch (e) {
      console.log(e.toString());
    }
  }
});

router.afterEach(()=>{
  LoadingBar.finish()
});
