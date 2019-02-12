import * as path from 'path';

export function redirect(req, res, next) {
    res.sendFile(path.resolve('./front/index.html'));
    next();
}
