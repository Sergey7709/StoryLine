import { Container, Paper, Text, Image } from "@mantine/core";
import { Footer } from "../../components/footer/Footer";

export const BookstoreServices = () => {
  return (
    <Container size={"xl"}>
      <Paper shadow="xs" p="lg" withBorder>
        <Image
          height={400}
          maw={"auto"}
          mb={20}
          src={
            "https://phonoteka.org/uploads/posts/2021-05/1620781634_15-phonoteka_org-p-fon-dlya-storis-dostavka-17.jpg"
          }
        />
        <Text size="lg" weight={500}>
          Доставка
        </Text>
        <Text size="md" style={{ marginBottom: "1rem" }}>
          Мы доставим ваш заказ в установленную дату, включая выходные дни и
          вечернее время.
        </Text>

        <Text size="md" weight={500}>
          Доставка курьером в течение 1 часа в городе {"Москва"}.
        </Text>
        <Text size="md" style={{ marginBottom: "1rem" }}>
          Вы также можете самостоятельно забрать товар из наших магазинов.
        </Text>

        <Text size="md" weight={500}>
          Доставка по всей стране осуществляется с помощью компании DHL.
        </Text>
        <Text size="md" style={{ marginBottom: "1rem" }}>
          Стоимость доставки начинается от {300} рублей, срок доставки
          {"4-5 дней"}
        </Text>

        <Text size="lg" weight={500}>
          Варианты оплаты:
        </Text>
        <Text size="md" style={{ marginBottom: "1rem" }}>
          - Наличный расчет при самовывозе из магазина.
          <br />- Оплата банковской картой.
        </Text>

        <Text size="lg" weight={500}>
          Время доставки
        </Text>
        <Text size="md" style={{ marginBottom: "1rem" }}>
          Менеджер Службы доставки свяжется с вами незамедлительно после
          оформления заказа, чтобы согласовать время доставки.
        </Text>

        <Text size="md" style={{ marginBottom: "1rem" }}>
          Пожалуйста, обратите внимание! Неправильно указанный номер телефона,
          неточный или неполный адрес могут привести к задержке доставки.
          Пожалуйста, тщательно проверьте свои личные данные при регистрации и
          оформлении заказа. Мы гарантируем конфиденциальность ваших
          регистрационных данных.
        </Text>

        <Text size="md" style={{ marginBottom: "1rem" }}>
          Доставка осуществляется ежедневно с 10:00 до 20:00, в субботу с 10:00
          до 14:00. В воскресенье доставка не осуществляется. Заказы, сделанные
          в субботу и воскресенье, будут доставлены в понедельник. Время
          доставки зависит от времени размещения заказа и наличия товара на
          складе:
        </Text>

        <Text size="md" weight={500}>
          Если менеджер Службы доставки подтверждает заказ до 14:00, то товар
          будет доставлен на следующий рабочий день между 11:00 и 16:00 или
          между 17:00 и 21:00.
        </Text>
        <Text size="md" style={{ marginBottom: "1rem" }}>
          Если менеджер Службы доставки подтверждает заказ после 14:00, то товар
          будет доставлен на следующий рабочий день между 16:00 и 19:00.
        </Text>

        <Text size="md" style={{ marginBottom: "1rem" }}>
          Вы также можете указать другое удобное время доставки, и мы доставим
          покупку в то время, которое вам удобно. Для населенных пунктов в
          регионе время доставки иное и согласовывается с клиентом.
        </Text>

        <Text size="lg" weight={500}>
          Место доставки
        </Text>
        <Text size="md" style={{ marginBottom: "1rem" }}>
          Мы доставим товар по адресу, указанному при оформлении заказа. Если
          вам необходимо доставить товар по другому адресу, сообщите об этом
          менеджеру Службы доставки, который свяжется с вами сразу после
          оформления заказа на сайте.
        </Text>

        <Text size="lg" weight={500}>
          Правила
        </Text>
        <Text size="md" style={{ marginBottom: "1rem" }}>
          При доставке вам будут переданы все необходимые документы для покупки.
          Если вы делаете покупку от имени организации, мы предоставим вам
          счет-фактуру и накладную, которую необходимо будет заверить печатью
          вашей организации. Цена, указанная в документах, которые передаст вам
          курьер, является окончательной и не подлежит изменению. Стоимость
          доставки указывается отдельно в документах для покупки.
        </Text>

        <Text size="md">
          Пожалуйста, помните! Прежде чем совершить покупку, уточните у нашего
          менеджера все технические параметры и потребительские свойства товара.
          Сотрудники Службы доставки не предоставляют консультации или
          комментарии относительно потребительских свойств товара. Если вам
          нужна установка товара, купленного у нас, сообщите об этом нашему
          менеджеру.
        </Text>
      </Paper>
      <Footer />
    </Container>
  );
};
