// backend/utils/bets.utils.js

export const calculateLiability = (status, type, stake, odds) => {
    if (status !== 'pending') {
        return 0;
    };

    switch ( type ) {
        case 'laybet':
            return Number(( stake * (odds - 1) ).toFixed(2));
        case 'freebet':
            return 0;
        case 'backbet':
            return Number(stake.toFixed(2));
    };
};

export const calculateCommission = (profit, commission) => {
    return Number((profit * (commission/100)).toFixed(2));
};

export const calculateResult = (status, type, stake, odds, liability, commission=0) => {
    if (status === 'pending') {
        return 0;
    };
    
    switch ( type ) {
        case 'laybet': {   // Exchange bets
            if (status === 'won') {
                const profit = stake;
                const commissionAmount = calculateCommission(profit, commission);
                return Number((profit - commissionAmount).toFixed(2));
            };
            return Number((-liability).toFixed(2));
        };
        
        case 'freebet': {
            if (status === 'won') {
                const profit = stake;
                const commissionAmount = calculateCommission(profit, commission);
                return Number((profit - commissionAmount).toFixed(2));
            };
            return 0;
        };

        case 'backbet': {
            if (status === 'won') {
                const profit = stake * (odds - 1);
                const commissionAmount = calculateCommission(profit, commission);
                return Number((profit - commissionAmount).toFixed(2));
            };
            return Number((-stake).toFixed(2));
        }

    }
}