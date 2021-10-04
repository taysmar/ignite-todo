import React, { useRef, useState } from "react";
import {
    Image,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

import Icon from "react-native-vector-icons/Feather";

import trashIcon from "../assets/icons/trash/trash.png";
import { EditTaskArgs } from "../pages/Home";
import { Task } from "./TasksList";

interface TaskItemProps {
    task: Task;
    toggleTaskDone: (id: number) => void;
    removeTask: (id: number) => void;
    editTask: ({ taskId, taskNewTitle }: EditTaskArgs) => void;
}

export default function TaskItem({
    task,
    toggleTaskDone,
    removeTask,
    editTask,
}: TaskItemProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [newTitle, setNewTitle] = useState(task.title);
    const textInputRef = useRef<TextInput>(null);

    function handleCancelEditing() {
        setNewTitle(task.title);
        setIsEditing(false);
    }

    function handleStartEditing() {
        setIsEditing(true);
    }

    function handleSubmitEditing() {
        editTask({
            taskId: task.id,
            taskNewTitle: newTitle,
        });
        setIsEditing(false);
    }

    React.useEffect(() => {
        if (textInputRef.current) {
            if (isEditing) {
                textInputRef.current.focus();
            } else {
                textInputRef.current.blur();
            }
        }
    }, [isEditing]);

    return (
        <>
            <View>
                <TouchableOpacity
                    activeOpacity={0.7}
                    style={styles.taskButton}
                    //TODO - use onPress (toggle task) prop
                    onPress={() => toggleTaskDone(task.id)}
                >
                    <View
                        //TODO - use style prop
                        style={task.done ? styles.taskMarkerDone : styles.taskMarker}
                    >
                        {task.done && <Icon name="check" size={12} color="#FFF" />}
                    </View>

                    <TextInput
                        //TODO - use style prop
                        style={task.done ? styles.taskTextDone : styles.taskText}
                        editable={isEditing}
                        onChangeText={setNewTitle}
                        onSubmitEditing={handleSubmitEditing}
                        value={newTitle}
                        ref={textInputRef}
                    />
                </TouchableOpacity>
            </View>

            <View style={styles.taskButtons}>
                {isEditing ? (
                    <TouchableOpacity
                        style={{ paddingHorizontal: 24 }}
                        //TODO - use onPress (remove task) prop
                        onPress={handleCancelEditing}
                    >
                        <Icon name="x" size={16} color="#B2B2B2" />
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity
                        style={{ paddingHorizontal: 24 }}
                        //TODO - use onPress (remove task) prop
                        onPress={handleStartEditing}
                    >
                        <Icon name="edit" size={16} color="#B2B2B2" />
                    </TouchableOpacity>
                )}

                <TouchableOpacity
                    style={{ paddingHorizontal: 24, opacity: isEditing ? 0.3 : 1 }}
                    //TODO - use onPress (remove task) prop
                    onPress={() => removeTask(task.id)}
                    disabled={isEditing}
                >
                    <Image source={trashIcon} />
                </TouchableOpacity>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    taskButton: {
        flex: 1,
        paddingHorizontal: 24,
        paddingVertical: 15,
        marginBottom: 4,
        borderRadius: 4,
        flexDirection: "row",
        alignItems: "center",
    },
    taskMarker: {
        height: 16,
        width: 16,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: "#B2B2B2",
        marginRight: 15,
        alignItems: "center",
        justifyContent: "center",
    },
    taskText: {
        color: "#666",
        fontFamily: "Inter-Medium",
    },
    taskMarkerDone: {
        height: 16,
        width: 16,
        borderRadius: 4,
        backgroundColor: "#1DB863",
        marginRight: 15,
        alignItems: "center",
        justifyContent: "center",
    },
    taskTextDone: {
        color: "#1DB863",
        textDecorationLine: "line-through",
        fontFamily: "Inter-Medium",
    },
    taskButtons: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
});