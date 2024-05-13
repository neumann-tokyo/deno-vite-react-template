import { useColorMode } from "@chakra-ui/react";
import Select from "react-select";

export function ReactSelectColorMode(props: any) {
	const { colorMode } = useColorMode();
	const colorModeTheme = (theme: any) => {
		if (colorMode === "light") {
			return theme;
		}
		return {
			...theme,
			borderRadius: 0,
			colors: {
				...theme.colors,
				primary: "#deebff",
				primary75: "#b2d4ff",
				primary50: "#4c9aff",
				primary25: "#2684ff",
				danger: "#ffbdad",
				dangerLight: "#de350b",
				neutral0: "#1a202c",
				neutral5: "#212938",
				neutral10: "#303b52",
				neutral20: "#3f4e6b",
				neutral30: "#4e6085",
				neutral40: "#5d739e",
				neutral50: "#6c86b8",
				neutral60: "#7c98d1",
				neutral70: "#8babeb",
				neutral80: "#97b9ff",
				neutral90: "#a9c6ff",
			},
		};
	};

	return <Select theme={colorModeTheme} {...props} />;
}
