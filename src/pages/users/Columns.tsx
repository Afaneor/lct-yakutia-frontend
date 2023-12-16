import PersonalOfferText from '../../components/_base/PersonalOfferText/PersonalOfferText'

export const Columns = () => {
  return [
    {
      title: 'Name',
      dataIndex: 'name',
      sorter: true,
      render: (name: { first: string; last: string }) =>
        `${name.first} ${name.last}`,
      width: '20%',
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      filters: [
        { text: 'Male', value: 'male' },
        { text: 'Female', value: 'female' },
      ],
      width: '10%',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      width: '20%',
    },
    {
      title: 'Предложение',
      dataIndex: 'personalOffer',
      width: '20%',
      render: (val: string, record: any) => (
        <PersonalOfferText
          text={
            'Ловите волшебный кешбэк до 30%\n' +
            'Ловите волшебный кешбэк до 30%\n' +
            'Ловите волшебный кешбэк до 30%\n' +
            'Ловите волшебный кешбэк до 30%\n' +
            'за покупки на маркетплейсах и в супермаркетах по дебетовой карте «Мир»'
          }
        />
      ),
    },
  ]
}
