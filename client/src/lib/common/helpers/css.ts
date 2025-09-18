export const getCssVariable = (variable: string) => {
	return getComputedStyle(document.documentElement)
		.getPropertyValue(variable)
		.trim()
}

export const setCssVariable = (key: string, value: string) => {
	document.documentElement.style.setProperty(key, value)
}
