import { extendTheme } from "@chakra-ui/react";

const Theme = extendTheme({
  config: {
    initialColorMode: "light",
    useSystemColorMode: false,
  },
  styles: {
    global: (props: { colorMode: string }) => ({
      body: {
        bg: props.colorMode === "dark" ? "black" : "white",
        // color: props.colorMode === 'dark' ? 'white' : 'black',
      },
    }),
  },
});
export default Theme;
