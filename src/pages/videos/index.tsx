import { useState, useEffect } from "react";
import { Spin, Col, Row, Card, Modal, notification } from "antd";
import { Container } from "modules";
import { useHooks, usePost } from "hooks";
import { Button } from "components";
import Update from "./update";
import Create from "./create";
import { Delete, Edit, CreateDoc } from "assets/images/icons";

const Video = () => {
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
      title: t("Вы действительно хотите удалить video?"),
      okText: t("да"),
      okType: "danger",
      cancelText: t("нет"),
      onOk: () => deleteAction(id),
    });
  };

  const deleteAction = (id: string) => {
    if (id) {
      mutate(
        { method: "delete", url: `/videos/${id}`, data: null },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: [`video`],
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
        title="Create video"
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
        title="Edit video"
        width={500}
        destroyOnClose
      >
        <Update {...{ showEditModal, selectedCard }} />
      </Modal>
      <div>
        <Container.All name="videos" url="/videos">
          {({ items, isLoading }) => {
            return (
              <div>
                <Button
                  title="Create video"
                  icon={<CreateDoc />}
                  // isLoading={successed}
                  size="large"
                  onClick={() => showCreateModal(true)}
                />
                <Row
                  className="h-[120px] mt-[15px]"
                >
                  {items.map((card) => {
                    return (
                      <>
                        <Col className="flex items-baseline justify-center">
                          <Card
                            hoverable
                            style={{ width: 260, marginRight: 15 }}
                            className="pb-4 bg-[#f2f2f2] border-[#f2f2f2] dark:bg-[#30354E] dark:border-[#30354E]"
                            cover={
                              <div className="flex justify-between">
                                <video className="object-cover rounded-[10px] w-[260px] h-[200px]" controls controlsList="nodownload">
                                  <source src={get(card, "video")} type="video/mp4" />
                                  <source src={get(card, "video")} type="video/ogg" />
                                </video>
                                <img className="object-cover rounded-[10px] w-[260px] h-[200px]" src={get(card, "image[0].medium")} alt="" />
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

export default Video;