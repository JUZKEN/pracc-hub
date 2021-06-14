const Button = {
   baseStyle: {
      fontWeight: "bold",
      borderRadius: "base",
      color: "gray.300"
   },
   sizes: {
      xs: {
         fontSize: "xs",
         px: 3,
         py: 3.5,
      },
      md: {
         fontSize: "sm",
         px: 4,
         py: 5,
      },
      lg: {
         fontSize: "md"
      }
   },
   variants: {
      default: {
         bg: "gray.700",
         _hover: {
            bg: "gray.600"
         },
         _active: {
            bg: "gray.500"
         }
      },
      red: {
         color: "white",
         bg: "brand.900",
         _hover: {
            bg: "brand.800"
         },
         _active: {
            bg: "brand.700"
         }
      }
   },
   defaultProps: {
      size: "md",
      variant: "default"
   },
}

export default Button;