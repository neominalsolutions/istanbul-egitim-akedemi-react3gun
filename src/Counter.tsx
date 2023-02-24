//tsfrc

import React, { useState } from "react";

type Props = {};

// default function component
export default function Counter({}: Props) {
  //const counter:number = 0; // constant değerlere default değer dışında atama yapılamaz

  //let counter: number = 0; // constant değerlere default değer dışında atama yapılamaz

  let [counter, setCounter] = useState<number>(0);
  // sarı olan önünde set state değiştiren method
  // mavi olan property değeri

  // react da component içerisindeki bir değişken değerini değiştirmek için useState hook kullanırız.
  // hook component içerisinde bir yaşam döngüsü sağlayan belirli işlemleri yapmak için kullandığımız yapılar

  // arrow functionları const ile tanımlıyoruz, fonksiyonu başka bir fonksiyona eşitlemeyeceğiz.
  const onIncrement = () => {
    // counter = counter + 1;
    setCounter(++counter);
    console.log("onIncrement", counter);
  };

  const onDecrement = () => {
    // counter--;
    setCounter(--counter); // setCounter ile state güncelledik.
    console.log("onDecrement", counter);
  };

  // <></> sadece html kodu kapsamak için kullanılan boş elemente fragment denir

  // değişeken değeri değiştiğinde return içerisindeki view güncellenemsi için useState hook kullanıyoruz.
  return (
    <>
      <div>Sayac : {counter}</div>
      <button onClick={onIncrement}>Arttır</button>
      <button onClick={onDecrement}>Azalt</button>
    </>
  );
}
