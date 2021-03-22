package top.vuhe.common.channel;

/**
 * @author zhuhe
 */
@FunctionalInterface
public interface EmptyListener<T> {
    void processing();
}
