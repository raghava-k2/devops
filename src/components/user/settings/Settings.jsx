import { TabPanel, TabView } from "primereact/tabview";
import { useContext } from "react";
import { Container } from "react-bootstrap";
import { createUseStyles } from "react-jss";
import { ToasterContext } from "../../common/Context";
import CloudConnections from "./cloudConnections/CloudConnections";

export default function Settings() {

    const { addMessage } = useContext(ToasterContext);

    const useStyles = createUseStyles({
        'container': {
            marginTop: '3.5rem'
        }
    });

    const classes = useStyles();

    return (
        <>
            <Container fluid className={classes.container}>
                <TabView>
                    <TabPanel header='Cloud Connections'>
                        <CloudConnections onError={addMessage}></CloudConnections>
                    </TabPanel>
                </TabView >
            </Container>
        </>
    );
}