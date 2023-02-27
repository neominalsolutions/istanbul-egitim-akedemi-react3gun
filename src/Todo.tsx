import React, { useState } from "react";
import "./Todo.css"; // css dosyalarına direkt olarak eriştik.

type Props = {};

// arrow function component
// arrow function componentlerde export en aşağıda yazılır
const Todo = (props: Props) => {
  // ekranda bir meyve listesi göstermeliyim
  // inputtan değer girince ekle butona basınca listeye yeni bir meyve girmeliyiz
  // ekrana yansıtılacak değerleri useState tanımlamak daha az maliyetli bir iş

  // jsx dosyasında bir elementin referansına erişmek için useRef kullanılır.

  //let fruits: string[] = [];
  const [fruits, setFruits] = useState<string[]>([]);
  // const [inpt, setInpt] = useState<string>("");
  let inpt: string = "";

  const onInputChange = (event: any) => {
    console.log("event", event.target.value);

    inpt = event.target.value;

    inpt = inpt.trim().toLowerCase(); //  muZ muz
    inpt = inpt.charAt(0).toUpperCase() + inpt.slice(1); // M + uz
    // Muz

    // inpt =
    //   inpt
    //     .trim() // sağ sol karakteri kes
    //     .toLocaleLowerCase() // tümünü küçük harf yap
    //     .charAt(0) // ilk karakteri yakala
    //     .toUpperCase() + inpt.slice(1);

    // inpt = `
    // ${
    //   (event.target.value as string)
    //     .trim() // sağ sol karakteri kes
    //     .toLocaleLowerCase() // tümünü küçük harf yap
    //     .charAt(0) // ilk karakteri yakala
    //     .toUpperCase() // ilk karakteri büyük harf yap
    // }${(event.target.value as string).trim().toLocaleLowerCase().slice(1)}`; // 1.den itibaren değeri al
    // ${(event.target.value as string).substring(1, event.target.value.length)}`; // 1.den itibaren değeri al

    console.log("inpt", inpt);
    event.target.value = ""; // inputu temizle

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
      // fruits = [...f2];
      // console.log("fruits", fruits);
      setFruits(f2); // virtual doma tetikleyen yapı state change
      // dizinin ilk sırasına eklenir.

      // eğer ilk eklenen değer değilse bu algoritma doğru
      // ilk eklenen seçili olmasın bug temizlenmiş oldu
      if (fruits.length > 1) {
        const newIndex = selectIndex + 1;
        setselectIndex(newIndex);
      }
    } else {
      alert("Aynı meyveden mevcut");
    }
  };

  // fruit değerini deleteItem içerisine parametre olarak göndermem lazım ki sileceğim nesneyi bileyim
  const deleteItem = (fruit: string) => {
    console.log("seçilen", fruit);
    const result = window.confirm("Silmek istediğinize emin misiniz?");

    if (result) {
      // true değer dönerse
      // silinecek item dışındakileri filtrele demek
      // arayüz güncellenecek
      const deletedIndex = fruits.findIndex((x) => x == fruit);
      const filteredFruits = fruits.filter((x) => x != fruit);
      console.log("filteredFruits", filteredFruits);
      setFruits(filteredFruits); // muz çıkmış halini yeni dizi olarak tanımla

      //seçilen değer silinecek ise seçimi temizlememiz lazım
      if (selectIndex == deletedIndex) {
        setselectIndex(-1);
      } else {
        // silinmeden sonra indeks değeri değiştiği için -1 ile silinen item'ı listeden düşüp son seçimin değişen indeksine göre yeniden seçimi düzenlememiz lazım
        const newIndex = selectIndex - 1;
        setselectIndex(newIndex);
      }
    } else {
      alert("silme işlemi iptal edildi");
    }
  };

  // select işlemini indeks üzerinden yada seçilen item üzerinden yapabiliriz.
  const select = (index: number) => {
    // selectedIndex = index;
    setselectIndex(index);
    console.log("selectedIndex", index);
    //setFruits([...fruits]);
    // react fruits değerine bakar eğer bir önceki fruits değeri ile bir sonraki fruits değeri aynı nesne ise virtul DOM üzerinde güncelleme yapmaz.
  };

  const deleteByIndex = (fruitIndex: number) => {
    console.log("fruitIndex", fruitIndex);
    const result = window.confirm("Silmek istediğinize emin misiniz?");

    if (result) {
      // true değer dönerse
      // silinecek item dışındakileri filtrele demek
      // arayüz güncellenecek
      fruits.splice(fruitIndex, 1); // 1.indexten 1 adet kayıt sil gibi bir kod ile dizinin içinden indeksinci item çıkardık.
      console.log("filteredFruits", fruits);

      setFruits([...fruits]); // muz çıkmış halini yeni dizi olarak tanımla
      // ... spread operatör ile dizini son halinin güncellenmesini sağlar.
    } else {
      alert("silme işlemi iptal edildi");
    }
  };

  //let selectedIndex: number = -1; // seçilmediği durumda -1 değeri verdik.

  const [selectIndex, setselectIndex] = useState<number>(-1);

  // virtual domda bir güncelle olmasını sağlayan kaç adet değişken var
  // 2 adet değişken var selectIndex,fruits
  // DOM da bir güncelleme olsun istersek bu durumda o component de kaç adet useState tanımı yaptığımız miktarlar üzerinden değişim olabilir

  return (
    <div>
      Statedeki değer Seçilen Index: {selectIndex}
      Input: {inpt}
      <br></br>
      <input
        id="inpt"
        type="text"
        // onChange={onInputChange}
        onBlur={onInputChange} // input focus değilse çalışsın
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
              className={selectIndex == index ? "secili" : ""}
              // ternaryf ile dinamik olarak bir duruma göre seçili class alıp almamasına seçilen indekse göre karar vermeliyim
              key={index}
              style={{
                padding: "10px",
                border: 1,
                borderStyle: "solid",
                borderColor: "red",
              }}
            >
              {fruit}
              <button onClick={() => deleteItem(fruit)}>Sil</button>
              <button onClick={() => deleteByIndex(index)}>Sil (Indeks)</button>
              <button onClick={() => select(index)}>Seç</button>
              {/* anonymous function callback */}
            </li>
            // key ile her bir li elementi domda unique bir değere sahip olur.
          );
        })}
      </ul>
    </div>
  );
};

export default Todo;
