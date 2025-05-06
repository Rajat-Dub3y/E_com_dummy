export const addDecimals=(num)=>{
    return (Math.round(num*100)/100).toFixed(2)
}

export const updateCart=(state)=>{
    state.itemsPrice=addDecimals(
        state.cartItems.reduce(
            (acc,item)=>acc+item.price*item.qty,
            0
        )
    );
    state.shippingPrice=addDecimals(state.itemsPrice>100 ? 0 :10)
    state.taxPrice=addDecimals(Number((0.15*state.itemsPrice).toFixed(2)))
    state.totalPrice=(
        Number(state.itemsPrice)+
        Number(state.shippingPrice)+
        Number(state.taxPrice)
    ).toFixed(2)
    if (state.totalprice) {
        console.warn("🔥 totalprice found in cart state");
        console.trace(); // Shows you where it's being set
        delete state.totalprice;
      }
    localStorage.setItem("cart",JSON.stringify(state))
    return state
}