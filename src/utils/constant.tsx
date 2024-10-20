const requestTimeout=3000
const mockUrl='/'
const productionUrl='/'
const baseURL=process.env.NODE_ENV==='development'?mockUrl:productionUrl

export {requestTimeout,baseURL}