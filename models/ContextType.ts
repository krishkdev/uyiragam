export interface UseContextType extends ShowCart,CartItems,TotalQuantities {
        incQty ?:number;
        decQty ?:number;
        onAdd ?:number;
        toggleCartItemQuanitity ?:number;
        onRemove ?:number;      
    }

    export interface CartItemsType {
        _id:string;
        quantity ?: number;
        price ?: number | 0;
    }

    export interface ShowCart {
        showCart ?:boolean;
        // setShowCart(value:boolean):void;
    }

    export interface CartItems {
        cartItems ?: CartItemsType[];
        setCartItems(value:CartItemsType[]): void;
    }
    
    export interface TotalQuantities {
        totalQuantities ?:number;
        setTotalQuantities(value: number) :void;
    }

    export interface Qty {
        qty ?:number;
        setQty(value:number) :void;
    }