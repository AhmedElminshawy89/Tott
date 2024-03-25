import { Box, Button, Skeleton } from '@chakra-ui/react';
const TableSkeleton = () => {
    return (
        <Box p={1} >
            <Box className="flex justify-end">
                <Button w={'150px'} mb={35}>
                    <Skeleton />
                </Button>
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

export default TableSkeleton
