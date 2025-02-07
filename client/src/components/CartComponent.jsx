import { FaTimes } from "react-icons/fa";
const CartSidebar = ({ cartItems, onClose }) => {
  return (
    <div className="fixed top-0 right-0 w-80 h-full bg-white shadow-lg p-4 z-50 overflow-y-auto border-l">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">Shopping Cart</h2>
        <button onClick={onClose} className="text-xl">
          <FaTimes />
        </button>
      </div>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        cartItems.map((item, index) => (
          <div key={index} className="border-b p-2 flex justify-between">
            <p>{item.name}</p>
            <p className="font-bold">${item.price}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default CartSidebar;
