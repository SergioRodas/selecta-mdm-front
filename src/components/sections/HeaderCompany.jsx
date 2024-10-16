const HeaderCompany = ({ documentName, documentSettings }) => {
  const logoStyles = documentSettings?.documentStyles?.logo || {};
  const titleStyles = documentSettings?.documentStyles?.title || {};

  const logoPosition = () => {
    switch (logoStyles.position) {
      case 'left':
        return 'flex-start';
      case 'center':
        return 'center';
      case 'right':
        return 'flex-end';
      default:
        return 'flex-start';
    }
  };

  return (
    <section>
      <div className="flex items-center space-x-5 md:space-x-10">
        <div className="w-1/4" style={{ justifyContent: logoPosition() }}>
          {logoStyles.active && (
            <img src={logoStyles.image} alt="Logo" className="w-full" />
          )}
        </div>
        <div className="flex flex-col justify-center items-start">
          <p
            style={{
              fontFamily: titleStyles?.font,
              fontSize: titleStyles?.fontSize,
              color: titleStyles?.color,
              fontWeight: titleStyles?.fontWeight,
              textAlign: titleStyles?.position,
            }}
            className="md:text-4xl text-2xl"
          >
            {documentName ? documentName.NOMBRE_DOCUMENTO : ''}
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeaderCompany;
