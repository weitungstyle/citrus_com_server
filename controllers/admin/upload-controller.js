const firebaseAdmin = require('../../connection/firebase')
const bucket = firebaseAdmin.storage().bucket()

const uploadController = {
  getImageUrl: (req, res, next) => {
    if (!req.file) {
      res.status(400).send('No file uploaded.')
      return
    }
    // 取得上傳的檔案資訊
    const file = req.file
    // 基於檔案的原始名稱建立一個 blob 物件
    const blob = bucket.file(`image/${file.originalname}`)
    // 建立一個可以寫入 blob 的物件
    const blobStream = blob.createWriteStream()

    // 如果上傳過程中發生錯誤，會觸發 error 事件
    blobStream.on('error', (err) => {
      next(err)
    })

    // 監聽上傳狀態，當上傳完成時，會觸發 finish 事件
    blobStream.on('finish', () => {
      // 設定檔案的存取權限
      const config = {
        action: 'read', // 權限
        expires: '12-31-2500' // 網址的有效期限
      }

      // 取得檔案的網址
      blob.getSignedUrl(config, (err, imgUrl) => {
        res.status(200).json({
          status: 'success',
          imageUrl: imgUrl
        })
        next(err)
      })
    })

    // 將檔案的 buffer 寫入 blobStream
    blobStream.end(file.buffer)
  }
}

module.exports = uploadController
