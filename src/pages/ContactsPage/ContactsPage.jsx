import { useDispatch, useSelector } from "react-redux";
import { selectError, selectLoading } from "../../redux/contacts/selectors";
import ContactForm from "../../components/ContactForm/ContactForm";
import SearchBox from "../../components/SearchBox/SearchBox";
import ContactList from "../../components/ContactList/ContactList";
import { useEffect } from "react";
import { fetchContacts } from "../../redux/contacts/operations";
import s from "./ContactsPage.module.css";
import { ClipLoader } from "react-spinners";

const ContactsPage = () => {
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div className={s.contacts_page}>
      <h1 className={s.title}>Phonebook</h1>
      <ContactForm />
      <SearchBox />
      {loading && (
        <div className={s.contacts_loader}>
          <ClipLoader
            color="#36d7b7"
            loading={true}
            size={80}
            aria-label="loading-spinner"
          />
        </div>
      )}
      {error && <p>error...</p>}
      <ContactList />
    </div>
  );
};

export default ContactsPage;
