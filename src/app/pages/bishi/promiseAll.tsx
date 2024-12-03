export default () => {
  const getData1 = () => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(1), 2000);
    });
  };
  const getData12 = () => {
    console.log(222);
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(2), 3000);
    });
  };
  const myAll = async (requests: any[]) => {
    let arr: any[] = [];
    let isError: boolean = false;
    let index: number = 0;
    return new Promise(async (resolve, reject) => {
      while (!isError && index < requests.length) {
        await requests[index]()
          .then((res) => {
            isError = false;
            arr.push(res);
            index++;
          })
          .catch((e) => {
            isError = true;
            arr.push(e);
          });
      }
      if (isError) {
        reject('失败');
      } else {
        resolve(arr);
      }
    });
  };

  //测试myAll
  const testAll = async () => {
    // const data = await Promise.all([getData1(), getData12()]);
    myAll([getData1, getData12])
      .then((res) => {
        console.log(res, '成功');
      })
      .catch((e) => {
        console.log(e, 'catch');
      });
  };
  return <div onClick={testAll}>手写promise.all;</div>;
};
