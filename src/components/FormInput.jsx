/* eslint-disable react/prop-types */
import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function FormInput({
  guessNumber,
  setGuessNumber,
  sliderValue,
  guessedNumbers,
  setGuessedNumbers,
  setCheckResult,
  randomNumber,
  attemptNumber,
  setAttemptNumber,
  hintMessageRef,
  maxValue,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    let guess = parseInt(formData.get("guessNumber"), 10);

    if (guess <= sliderValue) {
      if (guessedNumbers?.includes(guess)) {
        toast.warn("Bạn phải nhập một số khác với số đã đoán trước đó!", {
          position: "top-right",
          autoClose: 600,
        });
        return;
      }
      setGuessedNumbers((prevState) => {
        const updatedGuessedNumbers = [...prevState, guess];
        return updatedGuessedNumbers;
      });

      if (guess === randomNumber) {
        setCheckResult(true);
        setAttemptNumber((prev) => prev - 1);
        toast.success("Chúc mừng bạn đã đoán đúng!", {
          position: "top-right",
          autoClose: 600,
        });
        hintMessageRef.current = "Chúc mừng bạn đã đoán đúng!";
      } else {
        if (guess < randomNumber) {
          hintMessageRef.current = "Hmm... Bạn cần tăng một chút";
          toast.warn("Hmm... Bạn cần tăng một chút", {
            position: "top-right",
            autoClose: 600,
          });
        } else if (guess > randomNumber) {
          hintMessageRef.current = "Hmm... Bạn cần giảm một chút";
          toast.warn("Hmm... Bạn cần giảm một chút", {
            position: "top-right",
            autoClose: 600,
          });
        }
        if (attemptNumber === 1) {
          setCheckResult(true);
          if (guess < randomNumber) {
            hintMessageRef.current = "Đáng lẽ bạn nên tăng một chút";
            toast.error("Hmm... Bạn cần giảm một chút", {
              position: "top-right",
              autoClose: 600,
            });
          } else if (guess > randomNumber) {
            hintMessageRef.current = "Hmm... Bạn cần giảm một chút";
            toast.error("Hmm... Bạn cần giảm một chút", {
              position: "top-right",
              autoClose: 600,
            });
          }
        }
        setAttemptNumber((prevState) => prevState - 1);
      }
    } else {
      return;
    }
  };

  const handleInputChange = (e) => {
    setGuessNumber(e.target.value);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <FormControl mt={4}>
          <FormLabel color="teal.500">Hãy thử nhập một số</FormLabel>
          <Input
            placeholder={
              guessedNumbers?.length
                ? `Số trước là ${guessedNumbers[guessedNumbers.length - 1]}`
                : "Thử một số"
            }
            type="number"
            name="guessNumber"
            value={guessNumber}
            onChange={handleInputChange}
            min={1}
            max={maxValue}
          />
        </FormControl>
      </form>
    </>
  );
}
