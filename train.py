import tensorflow as tf
import numpy as np

epochs = 100
save_to_file = True
init_from_file = False
path = './model.ckpt'
rate = 0.

D = np.genfromtxt('data.csv', delimiter=',')[:, [3, 4, 5, 6]]
np.random.shuffle(D)

control_D = np.copy(D)

D[:, 0] = D[:, 0]/60/24
D[:, [2,3]] = D[:, [2,3]]/100
D = np.clip(D, 0, 1)

Y = D[:, [1]]
X = D[:, [0, 2, 3]]

M = D.shape[0]
m = M//3*2

training = tf.placeholder_with_default(True, shape=())

trainx = tf.constant(X[:m, :], dtype=tf.float32)
trainy = tf.constant(Y[:m, :], dtype=tf.float32)
cvx = tf.constant(X[m:, :], dtype=tf.float32)
cvy = tf.constant(Y[m:, :], dtype=tf.float32)

cv_m = cvx.shape[0]

train = tf.data.Dataset.from_tensor_slices((trainx, trainy))
cv = tf.data.Dataset.from_tensor_slices((cvx, cvy))

iter = tf.data.Iterator.from_structure(train.output_types, train.output_shapes)

train_init = iter.make_initializer(train)
cv_init = iter.make_initializer(cv)

x, y = iter.get_next()

a = tf.reshape(x, [1, -1])
a = tf.layers.dropout(a, rate=rate, training=training)
a = tf.layers.dense(a, 4)
a = tf.layers.dropout(a, rate=rate, training=training)
a = tf.layers.dense(a, 4)
a = tf.layers.dropout(a, rate=rate, training=training)
a = tf.layers.dense(a, 1)

logits = a[0, :]
labels = y

acc = tf.reduce_mean(tf.cast(tf.equal(tf.round(tf.sigmoid(logits)), labels), tf.float32))

J = tf.losses.sigmoid_cross_entropy(logits=logits, multi_class_labels=labels, label_smoothing=0.)
optimizer = tf.train.AdamOptimizer().minimize(J)

saver = tf.train.Saver()
with tf.Session() as sess:
    sess.run(tf.global_variables_initializer())
    if init_from_file:
        saver.restore(sess, path)
    for i in range(epochs):
        sess.run(train_init)
        costs = []
        for j in range(m):
            _, cost = sess.run([optimizer, J])
            costs.append(cost)
        print(i, np.average(costs))
    sess.run(train_init, feed_dict={training: False})
    costs = []
    accs = []
    for j in range(m):
        cost, accuracy = sess.run([J, acc], feed_dict={training: False})
        costs.append(cost)
        accs.append(accuracy)
    print(np.average(costs), np.average(accs))
    sess.run(cv_init, feed_dict={training: False})
    costs = []
    accs = []
    for j in range(cv_m):
        cost, accuracy = sess.run([J, acc], feed_dict={training: False})
        costs.append(cost)
        accs.append(accuracy)
    print(np.average(costs), np.average(accs))

    if save_to_file:
        saver.save(sess, path)

ml = np.mean(accs)

control = []
for i in range(int(np.min(control_D[:, 0])), int(np.max(control_D[:, 0]))):
    control.append(np.average(np.equal(np.where(i < control_D[:, 0], 1, 0), control_D[:, 1])))

print(np.max(control))

if ml >= np.max(control):
    print('It is better to use ML')
else:
    print('We proly need more data')