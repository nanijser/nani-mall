import storage from '@/utils/storage';

export default function cart(){
  const that = this;
  const key = "carts";
  return {
    addGoods(goods){
      let carts = storage.get(key) || { 'goods': [] };
      carts.goods.push(goods);
      storage.set(key, carts)
    },
    delGoods(index){

    }
  }
};
