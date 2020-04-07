const https = require('https');
const baseUrl = global.gConfig.base_url;

function getData({query}) {
    let url = `${baseUrl}/${query}`;
    
    return new Promise((resolve, reject) => {
        logger.info(url);
        try{
            https.get(url, res => {
                let statusCode = res.statusCode; 
                res.setEncoding("utf8");
                if (statusCode < 200 || statusCode > 299) { 
                    logger.error(`Error in request ${url} status code ${statusCode}`);
                    reject();
                }else{
                    let response = "";
                    res.on('data', chunk => {
                        response += chunk;
                    });
                    res.on('end', _ => {
                        try{
                            resolve(JSON.parse(response));
                        }catch(err){
                            logger.error(err);
                            resolve(response)
                        }
                    });
                }
            }).on('error', err => {
                logger.error(err);
                reject(err)
            })
        }catch(err){
            logger.error(`Error in request`+ url + err);
            reject(err);
        }
        
    });
}

function getDataPerPage({page,query}) {
    query = `${query}&page=${page}`;
    return getData({query})
}

function getAllData({query}) {
    return new Promise((resolve, reject) => {
        getData({query}).then(result => {
            let res = result;
            let total_pages = result.total_pages;
            let current_page = 1;
            let q = [];
            while(current_page < total_pages) {
                current_page++;
                q.push(getDataPerPage({query, page: current_page}));
                
            }
            Promise.all(q)
            .then(results => {
                res.data = res.data.concat(...results.map(v=>v.data));
                resolve(res.data);
            })
            .catch(err => {
                reject(err);
            });
            
        })
        .catch(err => {
            reject(err);
        })
    });
}
module.exports.fetchData = getAllData;