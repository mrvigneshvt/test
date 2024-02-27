const saveFile = async (file: any, caption: any, name: any,) => {
    try {
        const file_name = file.fileName.replace(/[_\-\.+]/g, ' ');
        const media = {
            fileName: file_name,
            fileSize: file.fileSize,
            fileId: file.fileId,
            fileUniqueId: file.fileUniqueId,
            fileType: file.fileType,
            mimeType: file.mimeType,
            caption: caption,
        }
        const db = await name.create(media)
        if(db){
            console.log(db)
        }else{
            console.log('skipped')
        }
        
        //console.log(db)


    } catch (err) {
        console.log(err)
    }

}

export default saveFile