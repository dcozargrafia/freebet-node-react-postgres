// utils/handleKeyDown.js
export const handleKeyDown = (e, step, setValue, value) => {
  if (e.key === 'ArrowUp') {
    setValue((prevValue) => (parseFloat(prevValue) || 0) + step);
  } else if (e.key === 'ArrowDown') {
    setValue((prevValue) => (parseFloat(prevValue) || 0) - step);
  }
};