import React from 'react';
import { useNavigate } from 'react-router-dom';

const CartButton = () => {
  const navigate = useNavigate();
  const onClick = (e) => {
    navigate("cart")
  } 
  return (
    <svg width="24" height="24" viewBox="0 0 31 27" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={onClick}>
    <path d="M27.6829 21.1472L30.4512 6.06599C30.4578 5.9992 30.4578 5.93169 30.4512 5.86491C30.4512 5.6427 30.3783 5.42959 30.2485 5.27246C30.1187 5.11533 29.9426 5.02706 29.7591 5.02706H7.57127L6.58852 0.594872C6.54536 0.422401 6.4574 0.271377 6.33772 0.164216C6.21803 0.0570544 6.073 -0.000531902 5.92414 3.70261e-06H0.692072C0.508523 3.70261e-06 0.332492 0.0882762 0.202703 0.245402C0.0729145 0.402528 0 0.615637 0 0.837847C0 1.06006 0.0729145 1.27317 0.202703 1.43029C0.332492 1.58742 0.508523 1.67569 0.692072 1.67569H5.39816L9.68901 21.1891C9.71797 21.3059 9.76766 21.4137 9.8346 21.5048C9.90154 21.596 9.98412 21.6684 10.0766 21.7169C9.81818 22.244 9.68413 22.8467 9.68901 23.4596C9.68901 24.3484 9.98066 25.2009 10.4998 25.8294C11.019 26.4579 11.7231 26.811 12.4573 26.811C13.1915 26.811 13.8956 26.4579 14.4148 25.8294C14.9339 25.2009 15.2256 24.3484 15.2256 23.4596C15.2226 22.8702 15.0913 22.2922 14.8449 21.7839H22.5269C22.2806 22.2922 22.1493 22.8702 22.1463 23.4596C22.1463 24.3484 22.438 25.2009 22.9571 25.8294C23.4763 26.4579 24.1804 26.811 24.9146 26.811C25.6488 26.811 26.3529 26.4579 26.8721 25.8294C27.3912 25.2009 27.6829 24.3484 27.6829 23.4596C27.6807 22.8407 27.537 22.2346 27.2676 21.7085C27.3683 21.6607 27.4582 21.585 27.5303 21.4875C27.6024 21.3901 27.6547 21.2735 27.6829 21.1472ZM24.8385 6.70275H28.894L28.2781 10.0541H24.534L24.8385 6.70275ZM7.93807 6.70275H12.5265L12.831 10.0541H8.67858L7.93807 6.70275ZM9.79282 15.0812L9.0523 11.7298H12.9902L13.3016 15.0812H9.79282ZM10.1665 16.7569H13.4539L13.7584 20.1082H10.914L10.1665 16.7569ZM12.4573 25.1353C12.1835 25.1353 11.9159 25.037 11.6883 24.8529C11.4607 24.6688 11.2833 24.4071 11.1785 24.1009C11.0737 23.7947 11.0463 23.4578 11.0997 23.1327C11.1532 22.8076 11.285 22.5091 11.4786 22.2747C11.6721 22.0404 11.9188 21.8808 12.1873 21.8161C12.4558 21.7515 12.7341 21.7846 12.987 21.9115C13.2399 22.0383 13.4561 22.2531 13.6082 22.5286C13.7603 22.8042 13.8414 23.1282 13.8414 23.4596C13.8414 23.904 13.6956 24.3302 13.436 24.6445C13.1765 24.9588 12.8244 25.1353 12.4573 25.1353ZM17.9939 20.1082H15.1495L14.8449 16.7569H17.9939V20.1082ZM17.9939 15.0812H14.6927L14.3813 11.7298H17.9939V15.0812ZM17.9939 10.0541H14.229L13.9245 6.70275H17.9939V10.0541ZM22.2224 20.1082H19.378V16.7569H22.5269L22.2224 20.1082ZM22.6861 15.0812H19.378V11.7298H22.9906L22.6861 15.0812ZM23.1498 10.0541H19.378V6.70275H23.4474L23.1498 10.0541ZM24.9146 25.1353C24.6408 25.1353 24.3732 25.037 24.1456 24.8529C23.918 24.6688 23.7406 24.4071 23.6358 24.1009C23.531 23.7947 23.5036 23.4578 23.557 23.1327C23.6104 22.8076 23.7423 22.5091 23.9359 22.2747C24.1294 22.0404 24.3761 21.8808 24.6446 21.8161C24.9131 21.7515 25.1914 21.7846 25.4443 21.9115C25.6972 22.0383 25.9134 22.2531 26.0655 22.5286C26.2176 22.8042 26.2987 23.1282 26.2987 23.4596C26.2987 23.904 26.1529 24.3302 25.8933 24.6445C25.6338 24.9588 25.2817 25.1353 24.9146 25.1353ZM26.4371 20.1082H23.6135L23.918 16.7569H27.0531L26.4371 20.1082ZM24.0772 15.0812L24.3886 11.7298H27.9805L27.3645 15.0812H24.0772Z" fill="#333333"/>
    </svg>

  );
};

export default CartButton;