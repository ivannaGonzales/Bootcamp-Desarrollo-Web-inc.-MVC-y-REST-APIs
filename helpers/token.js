const generarId = () => Math.random().toString(32).substring(2) * Date.now().toString(32);

//no me gusta este generarID

export {
    generarId
};
