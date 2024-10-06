/* eslint-disable react/prop-types */
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  TableCaption,
  Flex,
} from "@chakra-ui/react";
import DeleteButton from "./DeleteButton";

export default function TableResult({ playHistory, onDeleteHistory }) {
  if (!playHistory || playHistory.length === 0) {
    return null;
  }

  const elements = playHistory.map((item, index) => {
    const correctGuesses = item.filter((entry) => entry.right).length;
    console.log("correctGuesses", correctGuesses);
    const actualAttempts = item.length;
    const successRate = ((correctGuesses / actualAttempts) * 100).toFixed(2);

    return (
      <TableContainer
        key={index}
        border="1px"
        borderColor="black.200"
        borderRadius="10"
        minWidth="100%"
        marginRight="4"
        flex="1"
      >
        <Table size="md">
          <Thead>
            <Tr>
              <Th textAlign="center">Số lần nhập</Th>
              <Th textAlign="center">Số nhập vào</Th>
            </Tr>
          </Thead>
          <Tbody>
            {item.map((entry, idx) => (
              <Tr key={idx}>
                <Td textAlign="center" verticalAlign="middle" color="teal.400">
                  {idx + 1}
                </Td>
                <Td
                  textAlign="center"
                  verticalAlign="middle"
                  color={entry.right ? "teal.600" : "red.600"}
                >
                  {entry.number}
                </Td>
              </Tr>
            ))}
          </Tbody>
          <TableCaption>
            Lần chơi thứ: {index + 1} / {playHistory.length}
          </TableCaption>
          <TableCaption>Số lần nhập tối đa: {item[0].maxTime}</TableCaption>
          <TableCaption color={successRate >= 50 ? "teal.600" : "red.700"}>
            Tỷ lệ đúng: {successRate}%
          </TableCaption>
        </Table>
      </TableContainer>
    );
  });

  return (
    <Box position="relative">
      <Box overflowX="auto">
        <Flex>{elements}</Flex>
      </Box>
      <DeleteButton onDelete={onDeleteHistory} />
    </Box>
  );
}
