import { useState } from "react";
import { Col, Row, Modal, notification, Pagination } from "antd";
import { Container } from "modules";
import { useHooks, usePost } from "hooks";
import { Button } from "components";
import Create from "./create";
import { Delete, Edit, CreateDoc } from "assets/images/icons";

const Client = () => {
  const { get, queryClient, t } = useHooks();
  const [createModal, showCreateModal] = useState({ open: false, data: {} });
  const [page, setPage] = useState(1);
  const { mutate } = usePost();
  const onDeleteHandler = (id: string) => {
    Modal.confirm({
      title: t("Вы действительно хотите удалить gallery?"),
      okText: t("да"),
      okType: "danger",
      cancelText: t("нет"),
      onOk: () => deleteAction(id),
    });
  };

  const deleteAction = (id: string) => {
    if (id) {
      mutate(
        { method: "delete", url: `/galleries/${id}`, data: null },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: [`galleries`],
            });
            notification["success"]({
              message: t("Успешно удалена"),
              duration: 2,
            });
          },
          onError: (error: any) => {
            notification["error"]({
              message: get(error, "errorMessage", t("Произошло ошибка!")),
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
        open={createModal.open}
        onCancel={() => showCreateModal({ open: false, data: {} })}
        footer={null}
        centered
        title={get(createModal, "data._id") ? t("Update gallery") : t("Create gallery")}
        width={500}
        destroyOnClose
      >
        <Create {...{ showCreateModal, createModal }} />
      </Modal>
      <div>
        <Container.All
          name="galleries"
          url="/galleries"
          params={{
            page,
            limit: 8,
          }}
        >
          {({ items, meta }) => {
            return (
              <div>
                <div className="flex justify-between">
                  <Button
                    title={t("Create gallery")}
                    icon={<CreateDoc />}
                    size="large"
                    onClick={() => showCreateModal({ open: true, data: {} })}
                  />
                  {meta && meta.perPage && (
                    <div className="mt-[20px] flex justify-center">
                      <Pagination
                        current={meta.currentPage}
                        pageSize={meta.perPage}
                        total={meta.totalCount}
                        onChange={(page: any) => {
                          setPage(page);
                          window.scrollTo({
                            behavior: "smooth",
                            top: 0,
                            left: 0,
                          });
                        }}
                      />
                    </div>
                  )}
                </div>
                <Row className="h-[120px] mt-[15px]">
                  {items.map((card) => {
                    return (
                      <>
                        <Col className="flex items-baseline justify-center">
                          <div className="mr-8 mb-4">
                            <img
                              className="object-cover rounded-[10px] w-[260px] h-[200px]"
                              src={get(card, "images[0].medium")}
                            />
                            <div className="btnPanel2">
                              <div
                                className="editBtn"
                                onClick={() =>
                                  showCreateModal({ open: true, data: card })
                                }
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

export default Client;