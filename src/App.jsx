import React from "react";
import "./App.css";

import { useState, useEffect } from "react";

import img1 from "./component/icons/1.png";
import img2 from "./component/icons/2.png";
import img3 from "./component/icons/3.png";
import img4 from "./component/icons/4.png";
import img5 from "./component/icons/5.png";
import img6 from "./component/icons/6.png";
import img7 from "./component/icons/7.png";
import img8 from "./component/icons/8.png";

import img9 from "./component/icons/embedded-9413_70b2b146e304de0c.jpg";
import Perfectly from "./component/perfectly";

const initialArrayCards = [
  { id: 1, img: img1 },
  { id: 2, img: img2 },
  { id: 3, img: img3 },
  { id: 4, img: img4 },
  { id: 5, img: img5 },
  { id: 6, img: img6 },
  { id: 7, img: img7 },
  { id: 8, img: img8 },
]; // масив карточок з імпортом їх айді

const paidOFArrayCards = [...initialArrayCards, ...initialArrayCards]; // масив щоб намалювати спочатку гри подвійну кількість карток

const App = () => {
  const [arrayCards, setArrayCards] = useState([]); // масив карточок
  const [openCards, setOpenCards] = useState([]); // масив відкритих карток
  const [matched, setMatched] = useState([]); // масив однакових карток
  const [moves, setMoves] = useState(0); // масив щоб рахувати ходи

  const [isDisabled, setIsDisabled] = useState(false);

  //функція яка перемішує всі карточки
  const shuffle = (array) => {
    let currentIndex = array.length,
      tempareryValue,
      randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      tempareryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = tempareryValue;
    }

    return array;
  };

  useEffect(() => {
    setArrayCards(shuffle(paidOFArrayCards));
  }, []);

  const flipCard = (index) => {
    if (isDisabled || openCards.includes(index)) return;

    setOpenCards((opener) => [...opener, index]);
    setMoves((prevMove) => prevMove + 1);
  };

  useEffect(() => {
    // Нічого не робити, якщо відкрилося менше 2 карток
    if (openCards.length < 2) return;

    // Отримати дві відкриті картки
    const firstMatched = arrayCards[openCards[0]];

    const secondMatched = arrayCards[openCards[1]];

    // Перевірити, чи дві відкриті картки збігаються
    if (secondMatched && firstMatched.id === secondMatched.id) {
      setMatched((prevMatched) => [...prevMatched, firstMatched.id]);
    }
    setIsDisabled(false);

    // Якщо відкрито рівно дві картки, встановити таймаут для їх закриття через 800 мс
    if (openCards.length === 2) {
      setIsDisabled(true);
      const timeoutId = setTimeout(() => {
        setOpenCards([]);
        setIsDisabled(false);
      }, 800);

      // Очистити таймаут, якщо компонент буде відмонтувати або ефект виконається знову
      return () => clearTimeout(timeoutId);
    }
  }, [openCards, arrayCards]);

  const handleGameRestart = () => {
    // оновлюємо все до початкового етапу
    setArrayCards(shuffle(arrayCards));
    setMatched([]);
    setOpenCards([]);
    setMoves(0);
    setIsDisabled(false);
  };

  console.log(matched);
  console.log(moves);

  return (
    <div className="App">
      <p className="number-of-strokes">Зроблено ходів: {moves}</p>

      {matched.length === 8 ? (
        moves <= 25 ? (
          <div>
            <Perfectly />
          </div>
        ) : (
          moves <= 35 && (
            <div>
              <div className="cards">
                {arrayCards.map((item, index) => {
                  let isFlipped = false;

                  if (openCards.includes(index)) isFlipped = true;
                  if (matched.includes(item.id)) isFlipped = true;

                  return (
                    <div
                      className={`card ${isFlipped ? "flipped" : ""}`}
                      onClick={() => flipCard(index)}
                      key={index}
                    >
                      <div className="inner">
                        <div className="front">
                          <img src={item.img} width="100" alt="front" />
                        </div>
                        <div className="back">
                          <img src={img9} width="100" alt="back" />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )
        )
      ) : (
        <div>
          <div className="cards">
            {arrayCards.map((item, index) => {
              let isFlipped = false;

              if (openCards.includes(index)) isFlipped = true;
              if (matched.includes(item.id)) isFlipped = true;

              return (
                <div
                  className={`card ${isFlipped ? "flipped" : ""}`}
                  onClick={() => flipCard(index)}
                  key={index}
                >
                  <div className="inner">
                    <div className="front">
                      <img src={item.img} width="100" alt="front" />
                    </div>
                    <div className="back">
                      <img src={img9} width="100" alt="back" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <button className="button-restart" onClick={handleGameRestart}>
        ПОЧАТИ НОВУ ГРУ!
      </button>
    </div>
  );
};

export default App;
