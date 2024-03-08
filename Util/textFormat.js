const textListUl = (text) => {
  return <ul>{text.split('•').filter((el) => el !== '').map((sentence) => <li key={sentence}>• {sentence}</li>)}</ul>;
}

export {
  textListUl
}