function AppError(context) {
    return (err) => {
        console.log('here is error', err)
        
    }
}
export default (context, inject) => {
    inject('error', AppError(context))
}