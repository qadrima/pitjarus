const getReport = async (req, res, next) => {

    var data = await queryGetReport(req);
    var brand = [];

    if (data && data.length > 0) 
    {
        var groupBrand = data.reduce((group, item) => {
            
            if(!group[item.brand_id]) 
            {
                group[item.brand_id] = {
                    brand_id: item.brand_id,
                    brand_name : item.brand_name,
                    report: []
                };
            }

            if (item.compliance) {
                group[item.brand_id].report.push({
                    area_id     : item.area_id,
                    area_name   : item.area_name,
                    compliance  : item.compliance
                });
            }

            return group;
        }, {});

        for(var brand_id in groupBrand) {
            brand.push(groupBrand[brand_id]);
        }
    }

    res.status(200).json({
        status: true,
        data: brand
    });
};

const queryGetReport = (req) => {
    return new Promise((resolve, reject) => {

        const {db, query} = req;

        var sql = `
            SELECT 
                a.brand_id,
                a.brand_name,
                e.area_id,
                e.area_name,
                SUM(c.compliance)/COUNT(a.brand_id)*100 AS compliance

            FROM product_brand a
            LEFT JOIN product b ON b.brand_id = a.brand_id
            LEFT JOIN report_product c ON c.product_id = b.product_id
            LEFT JOIN store d ON d.store_id = c.store_id
            LEFT JOIN store_area e ON e.area_id = d.area_id
            WHERE 1=1
                --WHERE--
            GROUP BY a.brand_id, e.area_id
        `;

        var strWhere = '';

        if(query && query.area_id) {
            strWhere += ` AND e.area_id = `+query.area_id+` `;
        }

        if(query && query.date_from) {
            strWhere += ` AND c.tanggal >= '`+ query.date_from +`' `;
        }

        if(query && query.date_to) {
            strWhere += ` AND c.tanggal <= '`+ query.date_to +`' `;
        }

        sql = sql.replace('--WHERE--', strWhere);
        // console.log(sql);

        db.query(sql, (err, result) => {
            
            if(err){
                return reject(err);
            }

            return resolve(result);
            
        });

    });
};

module.exports = {getReport};