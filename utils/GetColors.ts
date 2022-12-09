const GetColors = (data: Array<any>) => {
  if (data) {
    const arrColors = []
    for (let i = 0; i < data?.length; i++) {
      arrColors.push("#" + (((1 << 24) * Math.random()) | 0).toString(16).padStart(6, "0"))
    }
    return arrColors
  }
}

export default GetColors
