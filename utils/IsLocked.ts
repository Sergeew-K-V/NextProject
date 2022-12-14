const isLocked = (isForm: boolean, status: { trained: boolean; selected: boolean; normalised: boolean; filled: boolean }) => {
  if (isForm) {
    return !(status.normalised && status.filled && status.trained)
  }
  return !(status.normalised && status.selected && status.trained)
}

export default isLocked
