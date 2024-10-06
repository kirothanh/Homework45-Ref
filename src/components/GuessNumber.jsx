import {
  Box,
  Divider,
  Heading,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
  VStack,
  Tooltip,
  IconButton,
  Button,
  useColorMode,
} from "@chakra-ui/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { useState, useEffect, useRef } from "react";
import TableResult from "./TableResult";
import FormInput from "./FormInput";

export default function GuessNumber() {
  const [sliderValue, setSliderValue] = useState(5);
  const [showTooltip, setShowTooltip] = useState(false);
  const [attemptNumber, setAttemptNumber] = useState(3);
  const [tryNumber, setTryNumber] = useState(3);
  const [maxValue, setMaxValue] = useState(5);
  const [randomNumber, setRandomNumber] = useState(1);
  const [checkResult, setCheckResult] = useState(false);
  const [guessedNumbers, setGuessedNumbers] = useState([]);
  const [playHistory, setPlayHistory] = useState(() => {
    const savedHistory = localStorage.getItem("data");
    return savedHistory ? JSON.parse(savedHistory) : [];
  });
  const [guessNumber, setGuessNumber] = useState("");
  const hintMessageRef = useRef("Chào mừng bạn đến với trò chơi đoán số!");

  const widthPercentage = checkResult ? 0 : (attemptNumber / tryNumber) * 100;

  const { colorMode, toggleColorMode } = useColorMode();

  useEffect(() => {
    if (sliderValue <= 7) {
      setTryNumber(3);
      setAttemptNumber(3);
    } else if (sliderValue <= 16) {
      setTryNumber(4);
      setAttemptNumber(4);
    } else if (sliderValue <= 32) {
      setTryNumber(5);
      setAttemptNumber(5);
    } else if (sliderValue <= 54) {
      setTryNumber(6);
      setAttemptNumber(6);
    } else if (sliderValue <= 127) {
      setTryNumber(7);
      setAttemptNumber(7);
    } else if (sliderValue <= 256) {
      setTryNumber(8);
      setAttemptNumber(8);
    } else if (sliderValue <= 512) {
      setTryNumber(9);
      setAttemptNumber(9);
    } else if (sliderValue <= 1024) {
      setTryNumber(10);
      setAttemptNumber(10);
    } else if (sliderValue <= 2048) {
      setTryNumber(11);
      setAttemptNumber(11);
    }

    setMaxValue(Math.pow(10, sliderValue.toString().length) - 1);

    setRandomNumber(getRandomNumber(sliderValue));
  }, [sliderValue]);

  const handlePlayAgainBtn = () => {
    const currentPlay = guessedNumbers.map((num) => ({
      number: num,
      maxTime: tryNumber,
      right: num === randomNumber,
    }));

    const updatedPlayHistory = [currentPlay, ...playHistory];
    setPlayHistory(updatedPlayHistory);
    localStorage.setItem("data", JSON.stringify(updatedPlayHistory));

    setCheckResult(false);
    setGuessNumber("");
    setAttemptNumber(tryNumber);
    hintMessageRef.current = "Chào mừng bạn đến với trò chơi đoán số!";
    setGuessedNumbers([]);
  };

  const handleDeleteHistory = () => {
    localStorage.removeItem("data");
    setPlayHistory([]);
  };

  function getRandomNumber(max) {
    return Math.floor(Math.random() * max) + 1;
  }

  return (
    <>
      <Box as="main" p={6} position="relative">
        <Divider
          orientation="horizontal"
          h={2}
          bg="teal.500"
          w={`${widthPercentage}%`}
          transition="width 0.5s ease-in-out 100ms"
        />
        <VStack align="stretch">
          <Heading as="h1" size="xl" textAlign="left" color="teal.600">
            {hintMessageRef.current}
          </Heading>
          <Heading as="h2" size="xl" textAlign="left" color="teal.500">
            Còn {attemptNumber}/{tryNumber} lần
          </Heading>
          <Heading as="h2" size="xl" textAlign="left" color="teal.500">
            Bạn cần tìm kiếm một số từ 1 đến {sliderValue}
          </Heading>

          <Slider
            aria-label="slider-ex-1"
            defaultValue={sliderValue}
            min={5}
            max={2048}
            onChange={(e) => {
              localStorage.setItem("RANGE_NUMBER", e);
              setSliderValue(e);
            }}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          >
            <SliderMark value={100} mt="1" ml="-2.5" fontSize="sm">
              100
            </SliderMark>
            <SliderMark value={512} mt="1" ml="-2.5" fontSize="sm">
              512
            </SliderMark>
            <SliderMark value={1024} mt="1" ml="-2.5" fontSize="sm">
              1024
            </SliderMark>
            <SliderMark value={1536} mt="1" ml="-2.5" fontSize="sm">
              1536
            </SliderMark>
            <SliderMark value={2048} mt="1" ml="-2.5" fontSize="sm">
              2048
            </SliderMark>
            <SliderTrack bg="gray.300">
              <SliderFilledTrack bg="teal.500" />
            </SliderTrack>
            <Tooltip
              hasArrow
              bg="teal.500"
              color="white"
              placement="top"
              isOpen={showTooltip}
              label={`${sliderValue}`}
            >
              <SliderThumb />
            </Tooltip>
          </Slider>

          {checkResult ? (
            <Button
              colorScheme="teal"
              size="md"
              w={20}
              mt={4}
              onClick={handlePlayAgainBtn}
            >
              Chơi lại
            </Button>
          ) : (
            <>
              <FormInput
                guessNumber={guessNumber}
                setGuessNumber={setGuessNumber}
                sliderValue={sliderValue}
                guessedNumbers={guessedNumbers}
                setGuessedNumbers={setGuessedNumbers}
                checkResult={checkResult}
                setCheckResult={setCheckResult}
                randomNumber={randomNumber}
                attemptNumber={attemptNumber}
                setAttemptNumber={setAttemptNumber}
                hintMessageRef={hintMessageRef}
                maxValue={maxValue}
              />
            </>
          )}

          <TableResult
            playHistory={playHistory}
            onDeleteHistory={handleDeleteHistory}
          />
        </VStack>

        <IconButton
          aria-label="Toggle theme"
          icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          borderRadius="full"
          position="absolute"
          top={39}
          right={6}
          bg="white"
          color="black"
          onClick={toggleColorMode}
        />
      </Box>
      <ToastContainer />
    </>
  );
}
