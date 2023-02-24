import React, { useState } from "react";

type Props = {};

// arrow function component
// arrow function componentlerde export en aşağıda yazılır
const Todo = (props: Props) => {
  // ekranda bir meyve listesi göstermeliyim
  // inputtan değer girince ekle butona basınca listeye yeni bir meyve girmeliyiz
  // ekrana yansıtılacak değerleri useState tanımlamak daha az maliyetli bir iş

  // jsx dosyasında bir elementin referansına erişmek için useRef kullanılır.

  const [fruits, setFruits] = useState<string[]>([]);
  // const [inpt, setInpt] = useState<string>("");
  let inpt: string = "";

  const onInputChange = (event: any) => {
    console.log("event", event.target.value);

    inpt = event.target.value;
    console.log("inpt", inpt);
    event.target.value = "";

    // setInpt(event.target.value);
  };

  const addfruit = () => {
    /*
    fruits.push(inpt); // item eklenmiş oldu
    const c = Object.assign(fruits);
    setFruits(c);
    */
    // spread operatör ile ...
    // const f: string[] = [...fruits, inpt];
    // setFruits(f);
    // elemanı dizinin sonuna ekler

    const isSame = fruits.find((fruit) => fruit == inpt);

    // ödev Elma, ELMA,  " elmA " trimsiz hali
    // tüm yanlış girme caseleri düşünülerek elma eğer dizide varsa hata verilsin

    if (!isSame) {
      const f2: string[] = [inpt, ...fruits];
      setFruits(f2); // virtual doma tetikleyen yapı state change
      // dizinin ilk sırasına eklenir.
    } else {
      alert("Aynı meyveden mevcut");
    }
  };

  return (
    <div>
      Input: {inpt}
      <input
        id="inpt"
        type="text"
        onBlur={onInputChange}
        placeholder="meyve giriniz"
      />
      <button onClick={addfruit}>Ekle</button>
      <hr></hr>
      {/* jsx bir dizi içerisindeki değerleri dönerek sayafaya yazdırmak için map kullanırız */}
      {/* state deki listeyi ekranda göstermek için map yapısı kullanırız. c# java foreach */}
      <ul>
        {fruits.map((fruit: string, index: number) => {
          return (
            <li
              key={index}
              style={{
                padding: "10px",
                border: 1,
                borderStyle: "solid",
                borderColor: "red",
              }}
            >
              {fruit}
            </li>
            // key ile her bir li elementi domda unique bir değere sahip olur.
          );
        })}
      </ul>
    </div>
  );
};

export default Todo;
