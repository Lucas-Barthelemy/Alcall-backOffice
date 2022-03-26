
function typeEvent(typeEvent, res) {
    switch (typeEvent) {
        case 'BAR':
            return;
        case 'CHILL':
            return;
        case 'NIGHTCLUB':
            return;
        case 'BIRTHDAY':
            return;
        case 'COSTUME PARTY':
            return;
        default:
            throw "INVALID_TYPE"
    }
}

module.exports = typeEvent;