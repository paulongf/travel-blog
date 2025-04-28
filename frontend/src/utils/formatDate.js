
export const formatDate = (isoDate) => {
    const date = Date(isoDate);
    return date.toLocaleDateString('en-Us', 
        {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        }
    )
}