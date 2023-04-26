const dev = process.env.NODE_ENV !== 'production';
export const URL = dev ? 'http://localhost:3000' : ''; 

export const TUZSODASAYAC_MESSAGE = {
    'content' : 'Günlük veri girişi gerçekleşmedi',
    'title': 'Tuz Soda Sayaç Toplama Kayıt Formu',
    'code': 'T1'
}