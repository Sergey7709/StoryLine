export const checkRankLevel = (totalOrderPrice: number) => {
  if (totalOrderPrice < 5000)
    return {
      title: 'Читатель',
      next: 5000 - totalOrderPrice,
      proc: Math.floor((totalOrderPrice / 5000) * 100),
      totalOrderPrice,
    };
  else if (totalOrderPrice < 25000)
    return {
      title: 'Книголюб',
      next: 25000 - totalOrderPrice,
      proc: Math.floor((totalOrderPrice / 25000) * 100),
      totalOrderPrice,
    };
  else if (totalOrderPrice < 50000)
    return {
      title: 'Книгоман',
      next: 50000 - totalOrderPrice,
      proc: Math.floor((totalOrderPrice / 50000) * 100),
      totalOrderPrice,
    };
  else if (totalOrderPrice < 100000)
    return {
      title: 'Книжный знаток',
      next: 100000 - totalOrderPrice,
      proc: Math.floor((totalOrderPrice / 100000) * 100),
      totalOrderPrice,
    };
  else if (totalOrderPrice < 200000)
    return {
      title: 'Книжный магистр',
      next: 200000 - totalOrderPrice,
      proc: Math.floor((totalOrderPrice / 200000) * 100),
      totalOrderPrice,
    };
  else return { title: 'Книжный бог', next: 0, proc: 100, totalOrderPrice };
};
