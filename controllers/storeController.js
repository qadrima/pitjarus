const getArea = async (req, res, next) => {
    var area = await queryGetArea(req.db);
    res.status(200).json({
        status: true,
        data: area
    });
};

const queryGetArea = (db) => {
    return new Promise((resolve, reject) => {

        var sql = `
            SELECT * FROM store_area
        `;

        db.query(sql, (err, result) => {
            
            if(err){
                return reject(err);
            }

            return resolve(result);
            
        });

    });
};

module.exports = {getArea};