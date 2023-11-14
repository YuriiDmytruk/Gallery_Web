
const getImagesByAuthor = (authorId : number) => {
    const connection = require('../connection')
    connection.query(`CALL getImagesByAuthor(${authorId})`, function (err: any, result: any) {
        if (err) throw err;
        console.log(result);
      });
    connection.end()
}

export {
    getImagesByAuthor,
  };