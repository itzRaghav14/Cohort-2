function counter (n) {
  let cnt = 0;
  const id = setInterval(() => {
    console.log (++cnt);
    if (cnt == n) {
      clearInterval (id);
    }
  }, 1000);
}

counter(10);