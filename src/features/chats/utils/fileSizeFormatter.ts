const FileSizeFormatter = (size: number): string => {
  // const
  const bytesInOneKb = 1024;
  const bytesInOneMb = 1024 * 1024;
  if (size < bytesInOneMb) {
    return (size / bytesInOneKb).toFixed(1) + " kbs";
  } else {
    return (size / bytesInOneMb).toFixed(1) + " Mbs";
  }
};

export default FileSizeFormatter;
