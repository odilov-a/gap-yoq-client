import { useState } from "react";
import { Spin, Col, Row, Card, Modal, notification } from "antd";
import { Container } from "modules";
import { useHooks, usePost } from "hooks";
import { Button } from "components";
import Update from "./update";
import Create from "./create";
import { Delete, Edit, CreateDoc } from "assets/images/icons";

const Dealer = () => {
  const { get, queryClient, t } = useHooks();
  const { Meta } = Card;
  const [editModal, showEditModal] = useState(false);
  const [createModal, showCreateModal] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [successed, setSuccess] = useState<boolean>(false);
  const [modal, setModal] = useState<{
    isOpen: boolean;
    data: null;
  }>({
    isOpen: false,
    data: null,
  });
  const { mutate } = usePost();
  const onEdit = (item: object) => {
    showEditModal(true);
    setSelectedCard(item);
  };
  const onDeleteHandler = (id: string) => {
    Modal.confirm({
      title: t("Вы действительно хотите удалить вакансия?"),
      okText: t("да"),
      okType: "danger",
      cancelText: t("нет"),
      onOk: () => deleteAction(id),
    });
  };

  const deleteAction = (id: string) => {
    if (id) {
      mutate(
        { method: "delete", url: `/dealers/${id}`, data: null },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: [`dealers`],
            });
            notification["success"]({
              message: "Успешно удалена",
              duration: 2,
            });
          },
          onError: (error: any) => {
            notification["error"]({
              message: get(error, "errorMessage", "Произошло ошибка!"),
              duration: 2,
            });
          },
        }
      );
    }
  };

  return (
    <div className="flex">
      <Modal
        open={createModal}
        onOk={() => showCreateModal(true)}
        onCancel={() => showCreateModal(false)}
        footer={null}
        centered
        title="Create dealer"
        width={500}
        destroyOnClose
      >
        <Create {...{ showCreateModal, setSuccess, successed }} />
      </Modal>
      <Modal
        open={editModal}
        onOk={() => showEditModal(true)}
        onCancel={() => showEditModal(false)}
        footer={null}
        centered
        title="Edit dealer"
        width={500}
        destroyOnClose
      >
        <Update {...{ showEditModal, selectedCard }} />
      </Modal>
      <div>
        <Container.All name="dealers" url="/dealers">
          {({ items, isLoading }) => {
            return (
              <div>
                <Button
                  title="Create dealer"
                  icon={<CreateDoc />}
                  // isLoading={successed}
                  size="large"
                  onClick={() => showCreateModal(true)}
                />
                <Row
                  justify="space-between"
                  align="stretch"
                  className="h-[75vh] mt-[15px]"
                >
                  {items.map((card) => {
                    return (
                      <>
                        <Col className="gutter-row mb-5" span={6}>
                          <Card
                            hoverable
                            style={{ width: 260, marginRight: 15 }}
                            className="pb-8 bg-[#f2f2f2] h-[100%] border-[#f2f2f2] dark:bg-[#30354E] dark:border-[#30354E]"
                          >
                            <Meta
                              className="pb-[40px]"
                              title={
                                <div className="flex justify-between items-center mb-1">
                                  <p className="dark:text-[#c4c5c8] text-lg">{(get(card, "name", ""))}</p>
                                  <p className="dark:text-[#c4c5c8] text-lg">{(get(card, "number", ""))}</p>
                                </div>
                              }
                              description={
                                <div>
                                  <p className="dark:text-[#e5e7eb] text-base line-clamp-3  mb-1">{(get(card, "address", ""))}</p>
                                </div>
                              }
                            />
                            <div className="btnPanel">
                              <div
                                className="editBtn"
                                onClick={() => onEdit(card)}
                              >
                                <Edit />
                              </div>
                              <div
                                onClick={() =>
                                  onDeleteHandler(get(card, "_id", ""))
                                }
                                className="deleteBtn"
                              >
                                <Delete />
                              </div>
                            </div>
                          </Card>
                        </Col>
                      </>
                    );
                  })}
                </Row>
              </div>
            );
          }}
        </Container.All>
      </div>
    </div>
  );
};

export default Dealer;