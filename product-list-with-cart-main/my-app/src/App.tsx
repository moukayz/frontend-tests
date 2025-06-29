import { useEffect, useState } from "react";

interface CartItemProps {
  name: string;
  cnt: number;
  price: number;
  onDelete: (name: string) => void;
}

const CartItem = ({ name, cnt, price, onDelete }: CartItemProps) => {
  return (
    <div className="w-full flex justify-between pb-6 border-b border-rose-800/20">
      <div className="flex flex-col gap-2 font-medium">
        <span className="text-black">{name}</span>
        <div className="flex gap-4 items-center">
          <span className="text-rose-500">{cnt}x</span>
          <span className="text-rose-800/50 font-light">
            @${price.toFixed(2)}
          </span>
          <span className="text-rose-800 font-bold">
            ${(price * cnt).toFixed(2)}
          </span>
        </div>
      </div>
      <button
        className="text-rose-800 font-medium text-sm"
        onClick={() => onDelete(name)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          fill="none"
          viewBox="0 0 10 10"
        >
          <path
            fill="#CAAFA7"
            d="M8.375 9.375 5 6 1.625 9.375l-1-1L4 5 .625 1.625l1-1L5 4 8.375.625l1 1L6 5l3.375 3.375-1 1Z"
          />
        </svg>
      </button>
    </div>
  );
};

interface CartProps {
  cartInfo: Record<string, number>;
  data: DessertInfo[];
  onDelete: (name: string) => void;
  onConfirm: () => void;
}

const Cart = ({ cartInfo, data, onDelete, onConfirm }: CartProps) => {
  const totalResult = Object.entries(cartInfo).reduce<{
    cnt: number;
    price: number;
  }>(
    (acc, [name, cnt]) => {
      const price = data.find((item) => item.name === name)?.price || 0;
      return {
        cnt: acc.cnt + cnt,
        price: acc.price + price * cnt,
      };
    },
    { cnt: 0, price: 0 }
  );

  return (
    <div className="py-6 px-6 bg-white rounded-lg flex flex-col w-full items-center md:w-1/3 md:max-h-[70vh] ">
      <span className="text-rose-700 font-bold text-2xl self-start pb-6">
        Your Cart({totalResult.cnt})
      </span>
      {totalResult.cnt > 0 && (
        <div className="flex flex-col w-full flex-1 min-h-0 ">
          <div className="flex flex-col gap-4 w-full bg-stone-100 rounded-lg p-4 md:overflow-y-auto ">
            {Object.entries(cartInfo)
              .filter(([, cnt]) => cnt > 0)
              .map(([name, cnt]) => (
                <CartItem
                  key={name}
                  onDelete={onDelete}
                  name={name}
                  cnt={cnt}
                  price={data.find((item) => item.name === name)?.price || 0}
                />
              ))}
          </div>

          <div className="flex justify-between py-4 items-center w-full">
            <span className="text-rose-800">Order Total</span>
            <span className="text-black font-bold text-2xl">
              ${totalResult.price.toFixed(2)}
            </span>
          </div>

          <button
            onClick={onConfirm}
            className="w-full rounded-full bg-red-500 py-4 text-white font-medium"
          >
            Confirm Order
          </button>
        </div>
      )}

      {totalResult.cnt === 0 && (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="128"
            height="128"
            fill="none"
            viewBox="0 0 128 128"
          >
            <path
              fill="#260F08"
              d="M8.436 110.406c0 1.061 4.636 2.079 12.887 2.829 8.252.75 19.444 1.171 31.113 1.171 11.67 0 22.861-.421 31.113-1.171 8.251-.75 12.887-1.768 12.887-2.829 0-1.061-4.636-2.078-12.887-2.828-8.252-.75-19.443-1.172-31.113-1.172-11.67 0-22.861.422-31.113 1.172-8.251.75-12.887 1.767-12.887 2.828Z"
              opacity=".15"
            />
            <path
              fill="#87635A"
              d="m119.983 24.22-47.147 5.76 4.32 35.36 44.773-5.467a2.377 2.377 0 0 0 2.017-1.734c.083-.304.104-.62.063-.933l-4.026-32.986Z"
            />
            <path
              fill="#AD8A85"
              d="m74.561 44.142 47.147-5.754 1.435 11.778-47.142 5.758-1.44-11.782Z"
            />
            <path
              fill="#CAAFA7"
              d="M85.636 36.78a2.4 2.4 0 0 0-2.667-2.054 2.375 2.375 0 0 0-2.053 2.667l.293 2.347a3.574 3.574 0 0 1-7.066.88l-1.307-10.667 14.48-16.88c19.253-.693 34.133 3.6 35.013 10.8l1.28 10.533a1.172 1.172 0 0 1-1.333 1.307 4.696 4.696 0 0 1-3.787-4.08 2.378 2.378 0 1 0-4.72.587l.294 2.346a2.389 2.389 0 0 1-.484 1.755 2.387 2.387 0 0 1-1.583.899 2.383 2.383 0 0 1-1.755-.484 2.378 2.378 0 0 1-.898-1.583 2.371 2.371 0 0 0-1.716-2.008 2.374 2.374 0 0 0-2.511.817 2.374 2.374 0 0 0-.493 1.751l.293 2.373a4.753 4.753 0 0 1-7.652 4.317 4.755 4.755 0 0 1-1.788-3.17l-.427-3.547a2.346 2.346 0 0 0-2.666-2.053 2.4 2.4 0 0 0-2.08 2.667l.16 1.173a2.378 2.378 0 1 1-4.72.587l-.107-1.28Z"
            />
            <path
              stroke="#fff"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width=".974"
              d="m81.076 28.966 34.187-4.16"
            />
            <path
              fill="#87635A"
              d="M7.45 51.793c-.96 8.48 16.746 17.44 39.466 19.947 22.72 2.506 42.08-2.16 43.04-10.667l-3.947 35.493c-.96 8.48-20.24 13.334-43.04 10.667S2.463 95.74 3.423 87.18l4.026-35.387Z"
            />
            <path
              fill="#AD8A85"
              d="M5.823 65.953c-.96 8.453 16.746 17.44 39.573 20.027 22.827 2.586 42.053-2.187 43.013-10.667L87.076 87.1c-.96 8.48-20.24 13.333-43.04 10.666C21.236 95.1 3.53 86.22 4.49 77.74l1.334-11.787Z"
            />
            <path
              fill="#CAAFA7"
              d="M60.836 42.78a119.963 119.963 0 0 0-10.347-1.627c-24-2.667-44.453 1.893-45.333 10.373l-2.133 18.88a3.556 3.556 0 1 0 7.066.8 3.574 3.574 0 1 1 7.094.8l-.8 7.094a5.93 5.93 0 1 0 11.786 1.333 3.556 3.556 0 0 1 7.067.8l-.267 2.347a3.573 3.573 0 0 0 7.094.826l.133-1.2a5.932 5.932 0 1 1 11.787 1.36l-.4 3.52a3.573 3.573 0 0 0 7.093.827l.933-8.267a1.174 1.174 0 0 1 1.307-.906 1.146 1.146 0 0 1 1.04 1.306 5.947 5.947 0 0 0 11.813 1.334l.534-4.72a3.556 3.556 0 0 1 7.066.8 3.573 3.573 0 0 0 7.094.826l1.786-15.546a2.373 2.373 0 0 0-2.08-2.667L44.143 55.74l16.693-12.96Z"
            />
            <path
              fill="#87635A"
              d="m59.156 57.66 1.68-14.88-16.827 13.173 15.147 1.707Z"
            />
            <path
              stroke="#fff"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width=".974"
              d="M9.796 52.06c-.667 5.866 16.24 12.586 37.733 15.04 14.774 1.68 27.867.906 34.854-1.654"
            />
          </svg>

          <span className="text-rose-900 text-sm font-medium">
            Your added items will appear here
          </span>
        </>
      )}
    </div>
  );
};

interface DessertInfo {
  image: {
    thumbnail: string;
    mobile: string;
    tablet: string;
    desktop: string;
  };
  name: string;
  category: string;
  price: number;
}

interface DessertProps {
  dessert: DessertInfo;
  cnt: number;
  onUpdateCnt: (cnt: number) => void;
}

const Dessert = ({ dessert, cnt, onUpdateCnt }: DessertProps) => {
  const isAdded = cnt > 0;

  const addToCartAction = () => {
    return (
      <div
        onClick={() => onUpdateCnt(1)}
        className="py-2 flex gap-2 px-6 w-full items-center justify-center bg-white border-rose-800 border hover:border-2 hover:text-rose-800 rounded-full"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1.5em"
          height="1.5em"
          fill="none"
          viewBox="0 0 21 20"
        >
          <g fill="#C73B0F" clip-path="url(#a)">
            <path d="M6.583 18.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM15.334 18.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM3.446 1.752a.625.625 0 0 0-.613-.502h-2.5V2.5h1.988l2.4 11.998a.625.625 0 0 0 .612.502h11.25v-1.25H5.847l-.5-2.5h11.238a.625.625 0 0 0 .61-.49l1.417-6.385h-1.28L16.083 10H5.096l-1.65-8.248Z" />
            <path d="M11.584 3.75v-2.5h-1.25v2.5h-2.5V5h2.5v2.5h1.25V5h2.5V3.75h-2.5Z" />
          </g>
          <defs>
            <clipPath id="a">
              <path fill="#fff" d="M.333 0h20v20h-20z" />
            </clipPath>
          </defs>
        </svg>
        <span>Add to cart</span>
      </div>
    );
  };

  const updateCntAction = () => {
    return (
      <div className="bg-red-500 rounded-full py-2 flex gap-8 px-4 items-center justify-between text-white">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="10"
          height="10"
          fill="none"
          viewBox="0 0 10 10"
          onClick={() => onUpdateCnt(cnt - 1)}
        >
          <path fill="currentColor" d="M0 4.375h10v1.25H0z" />
        </svg>
        <span>{cnt}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="10"
          height="10"
          fill="currentColor"
          viewBox="0 0 10 10"
          onClick={() => onUpdateCnt(cnt + 1)}
        >
          <path
            fill="currentColor"
            d="M10 4.375H5.625V0h-1.25v4.375H0v1.25h4.375V10h1.25V5.625H10v-1.25Z"
          />
        </svg>
      </div>
    );
  };

  return (
    <div className={`flex h-full flex-col items-start justify-start `}>
      <picture className="relative flex-1 mb-8">
        <source srcSet={dessert.image.desktop} media="(min-width: 1024px)" />
        <source srcSet={dessert.image.tablet} media="(min-width: 640px)" />
        <img
          className={`h-full w-full object-contain rounded-lg ${
            isAdded ? "outline-2 outline-red-500 -outline-offset-2" : ""
          }`}
          src={dessert.image.mobile}
          alt={dessert.name}
        />

        <button className="text-xs font-medium absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2  cursor-pointer   ">
          {isAdded && updateCntAction()}

          {!isAdded && addToCartAction()}
        </button>
      </picture>

      <span className="text-rose-800/50 text-sm">{dessert.category}</span>
      <span className="font-medium">{dessert.name}</span>
      <span className="text-rose-600 font-medium">${dessert.price}</span>
    </div>
  );
};

interface ConfirmItemProps {
  name: string;
  cnt: number;
  price: number;
  image: string;
}

const ConfirmItem = ({ name, cnt, price, image }: ConfirmItemProps) => {
  return (
    <div className="flex justify-start gap-4 text-sm w-full py-6 border-b border-rose-800/20">
      <img src={image} alt={name} className="rounded-lg w-16 h-16" />
      <div className="flex flex-col justify-between py-2">
        <span className="text-black font-medium">{name}</span>
        <div className="flex gap-4">
          <span className="text-rose-500">{cnt}x</span>
          <span className="text-rose-800/50">@${price.toFixed(2)}</span>
        </div>
      </div>
      <span className="self-center text-black font-bold ml-auto">
        ${(price * cnt).toFixed(2)}
      </span>
    </div>
  );
};

interface ConfirmModalProps {
  open: boolean;
  closeModal: () => void;
  cartInfo: Record<string, number>;
  data: DessertInfo[];
  onSubmitOrder: () => void;
}

const ConfirmModal = ({
  open,
  closeModal,
  cartInfo,
  data,
  onSubmitOrder,
}: ConfirmModalProps) => {
  const totalPrice = Object.entries(cartInfo).reduce((acc, [name, cnt]) => {
    const price = data.find((item) => item.name === name)?.price || 0;
    return acc + price * cnt;
  }, 0);

  return (
    <>
      <div
        className={`
          fixed inset-0 z-40
          bg-black/30
          transition-opacity duration-200
          ${
            open
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }
        `}
        onClick={() => closeModal()}
      />

      <div
        className={`h-[90vh] fixed left-0 bottom-0 w-full z-50 transform transform-transition duration-300 bg-white rounded-t-2xl md:transition-none md:h-2/3 md:w-1/3 md:rounded-lg 
        ${
          open
            ? " translate-y-0 md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2"
            : "translate-y-full"
        }
        `}
      >
        <div className="w-full h-full p-6 flex flex-col gap-4">
          <img
            className="w-16 h-16 my-4"
            src="/assets/images/icon-order-confirmed.svg"
            alt="complete"
          />
          <span className="text-4xl font-bold">Order Confirmed</span>
          <span className="text-md text-rose-800/50">
            We hope you enjoy your food!
          </span>
          <div className="my-4 flex flex-col rounded-lg bg-rose-50 w-full px-4 flex-1 min-h-0">
            <div className="flex flex-col overflow-y-auto flex-1">
              {Object.entries(cartInfo)
                .filter(([, cnt]) => cnt > 0)
                .map(([name, cnt]) => (
                  <ConfirmItem
                    key={name}
                    name={name}
                    cnt={cnt}
                    price={data.find((item) => item.name === name)?.price || 0}
                    image={
                      data.find((item) => item.name === name)?.image
                        .thumbnail || ""
                    }
                  />
                ))}
            </div>

            <div className="flex justify-between py-6 items-center">
              <span className="text-rose-800/50 font-medium">Order Total</span>
              <span className="text-black text-3xl font-bold">
                ${totalPrice.toFixed(2)}
              </span>
            </div>
          </div>
          <button
            onClick={onSubmitOrder}
            className="bg-red-600 w-full py-4 rounded-full font-bold text-white"
          >
            Start New Order
          </button>
        </div>
      </div>
    </>
  );
};

function App() {
  const [data, setData] = useState<DessertInfo[]>([]);
  const [cartInfo, setCartInfo] = useState<Record<string, number>>({});
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);

  useEffect(() => {
    fetch("/data.json")
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setCartInfo({});
      });
  }, []);

  return (
    <div className="bg-stone-100 px-4 py-10 flex flex-col gap-4 md:p-20 md:flex-row md:items-start md:gap-10 md:h-screen">
      <div className="flex flex-col gap-4 md:h-full">
        <span className="text-black font-bold text-4xl ">Dessert</span>
        <div className="  flex flex-col items-start justify-center   gap-4 md:grid md:grid-cols-3 md:gap-8 md:overflow-y-auto">
          {data.map((item, index) => (
            <Dessert
              key={index}
              dessert={item}
              cnt={cartInfo[item.name]}
              onUpdateCnt={(cnt) => {
                setCartInfo((prev) => ({ ...prev, [item.name]: cnt }));
              }}
            />
          ))}
        </div>
      </div>

      <Cart
        cartInfo={cartInfo}
        data={data}
        onDelete={(name) => {
          setCartInfo((prev) => ({ ...prev, [name]: 0 }));
        }}
        onConfirm={() => setConfirmModalOpen(true)}
      />

      <ConfirmModal
        open={confirmModalOpen}
        closeModal={() => setConfirmModalOpen(false)}
        cartInfo={cartInfo}
        data={data}
        onSubmitOrder={() => {
          setCartInfo({});
          setConfirmModalOpen(false);
        }}
      />
    </div>
  );
}

export default App;
