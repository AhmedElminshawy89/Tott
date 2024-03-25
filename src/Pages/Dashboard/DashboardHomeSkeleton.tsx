import { Box, Flex,Text, Skeleton } from '@chakra-ui/react';

const DashboardHomeSkeleton = () => {
    return (
        <Box p={1} >
        <Box className="flex items-center justify-between flex-wrap gap-8  pb-11">
        <Box className="bg-[#eee] flex-1 p-4 rounded-xl shadow-xl">
          <Flex alignItems={"center"} gap={8} justifyContent={"space-between"}>
            <Box className='w-25 h-14'>
              <Text className=" text-[#67748e] text-2xl font-semibold">
                <Skeleton/>
              </Text>
              <Text className="text-[#344767] text-lg font-medium"><Skeleton/></Text>
            </Box>
          </Flex>
        </Box>
        <Box className="bg-[#eee] flex-1 p-4 rounded-xl shadow-xl">
          <Flex alignItems={"center"} gap={8} justifyContent={"space-between"}>
            <Box className='w-25 h-14'>
              <Text className=" text-[#67748e] text-2xl font-semibold">
                <Skeleton/>
              </Text>
              <Text className="text-[#344767] text-lg font-medium"><Skeleton/></Text>
            </Box>
          </Flex>
        </Box>
        <Box className="bg-[#eee] flex-1 p-4 rounded-xl shadow-xl">
          <Flex alignItems={"center"} gap={8} justifyContent={"space-between"}>
            <Box className='w-25 h-14'>
              <Text className=" text-[#67748e] text-2xl font-semibold">
                <Skeleton/>
              </Text>
              <Text className="text-[#344767] text-lg font-medium"><Skeleton/></Text>
            </Box>
          </Flex>
        </Box>
        <Box className="bg-[#eee] flex-1 p-4 rounded-xl shadow-xl">
          <Flex alignItems={"center"} gap={8} justifyContent={"space-between"}>
            <Box className='w-25 h-14'>
              <Text className=" text-[#67748e] text-2xl font-semibold">
                <Skeleton/>
              </Text>
              <Text className="text-[#344767] text-lg font-medium"><Skeleton/></Text>
            </Box>
          </Flex>
        </Box>
        </Box>
            {Array.from({ length: 10 }, (_, idx) => (
                <>
                    <Skeleton height="30px" />
                    <Box overflowX="auto" p={1} key={idx}>
                        <table>
                            <thead>
                                <tr>
                                    <Skeleton />
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <Skeleton />
                                    <Skeleton />
                                    <Skeleton />
                                </tr>
                            </tbody>
                        </table>
                    </Box>
                </>
            ))}
        </Box>

    )
}

export default DashboardHomeSkeleton
